import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect, notFound } from 'next/navigation';
import { updateTransaction } from '../../actions';

const categories = [
  'Food', 'Transport', 'Bills', 'Entertainment', 'Shopping',
  'Health', 'Education', 'Salary', 'Freelance', 'Other',
];

export default async function EditTransactionPage({ params }) {
  const { id } = await params;
  const session = await auth();
  if (!session) redirect('/login');

  const transaction = await prisma.transaction.findUnique({ where: { id } });

  if (!transaction || transaction.userId !== session.user.id) {
    notFound();
  }

  const plainTransaction = {
    ...transaction,
    amount: Number(transaction.amount),
  };

  const updateWithId = updateTransaction.bind(null, id);

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Edit Transaction</h1>

      <form action={updateWithId} className="bg-white shadow-sm rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input type="text" name="title" required defaultValue={transaction.title} className="w-full border rounded-lg px-4 py-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input type="number" name="amount" step="0.01" required defaultValue={plainTransaction.amount} className="w-full border rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select name="type" required defaultValue={transaction.type} className="w-full border rounded-lg px-4 py-2">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select name="category" required defaultValue={transaction.category} className="w-full border rounded-lg px-4 py-2">
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            name="date"
            required
            defaultValue={new Date(transaction.date).toISOString().split('T')[0]}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
          <textarea name="notes" rows={2} defaultValue={transaction.notes || ''} className="w-full border rounded-lg px-4 py-2" />
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <a href="/dashboard" className="px-5 py-2 rounded-lg text-gray-600 hover:bg-gray-100">Cancel</a>
          <button type="submit" className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700">Update</button>
        </div>
      </form>
    </div>
  );
}