import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { getMonthlyTrend, getCategoryBreakdown } from '@/lib/chart-data';
import TrendChart from './components/TrendChart';
import CategoryChart from './components/CategoryChart';
import DeleteButton from './components/DeleteButton';
import ExportButton from './components/ExportButton';
import Filters from './components/Filters';

export default async function DashboardPage({ searchParams }) {
  const params = await searchParams;
  const session = await auth();
  const userId = session.user.id;

  const where = { userId };
  if (params.category) where.category = params.category;
  if (params.type) where.type = params.type;
  if (params.from || params.to) {
    where.date = {};
    if (params.from) where.date.gte = new Date(params.from);
    if (params.to) where.date.lte = new Date(params.to);
  }

  const transactions = await prisma.transaction.findMany({
    where,
    orderBy: { date: 'desc' },
  });

  const plainTransactions = transactions.map((t) => ({
    ...t,
    amount: Number(t.amount),
  }));

  const totals = await prisma.transaction.groupBy({
    by: ['type'],
    where: { userId },
    _sum: { amount: true },
  });

  const income = totals.find((t) => t.type === 'income')?._sum.amount || 0;
  const expense = totals.find((t) => t.type === 'expense')?._sum.amount || 0;
  const balance = Number(income) - Number(expense);

  const trendData = getMonthlyTrend(plainTransactions);
  const categoryData = getCategoryBreakdown(plainTransactions);
  const recentTransactions = transactions.slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-sm rounded-xl p-5">
          <p className="text-sm text-gray-500">Total Balance</p>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            Rs. {balance.toLocaleString()}
          </p>
        </div>
        <div className="bg-white shadow-sm rounded-xl p-5">
          <p className="text-sm text-gray-500">Total Income</p>
          <p className="text-2xl font-bold text-green-600">Rs. {Number(income).toLocaleString()}</p>
        </div>
        <div className="bg-white shadow-sm rounded-xl p-5">
          <p className="text-sm text-gray-500">Total Expense</p>
          <p className="text-2xl font-bold text-red-600">Rs. {Number(expense).toLocaleString()}</p>
        </div>
      </div>

      <div className="flex justify-end">
        
        <a  href="/dashboard/add"
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700"
        >
          + Add Transaction
        </a>
      </div>
      <div className="flex justify-end gap-3">
        <ExportButton transactions={plainTransactions} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-sm rounded-xl p-5">
          <h2 className="font-semibold text-gray-700 mb-3">Income vs Expense Trend</h2>
          <TrendChart data={trendData} />
        </div>
        <div className="bg-white shadow-sm rounded-xl p-5">
          <h2 className="font-semibold text-gray-700 mb-3">Expense by Category</h2>
          <CategoryChart data={categoryData} />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white shadow-sm rounded-xl overflow-hidden">
        <h2 className="font-semibold text-gray-700 p-5 pb-0">Recent Transactions</h2>
        <table className="w-full text-sm text-left mt-3">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3 text-right">Amount</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {recentTransactions.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-6 text-center text-gray-500">
                  No transactions yet.
                </td>
              </tr>
            )}
            {plainTransactions.map((t) => (
              <tr key={t.id}>
                <td className="px-5 py-4">{t.title}</td>
                <td className="px-5 py-4">{t.category}</td>
                <td className="px-5 py-4">{new Date(t.date).toLocaleDateString()}</td>
                <td className={`px-5 py-4 text-right font-medium ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'income' ? '+' : '-'} Rs. {Number(t.amount).toLocaleString()}
                </td>
                <td className="px-5 py-4 space-x-3">
                    <a href={`/dashboard/edit/${t.id}`} className="text-indigo-600 hover:underline text-sm">Edit</a>
                    <DeleteButton id={t.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Filters />
    </div>
  );
}