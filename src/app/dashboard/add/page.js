import { addTransaction } from './actions';

const categories = [
  'Food', 'Transport', 'Bills', 'Entertainment', 'Shopping',
  'Health', 'Education', 'Salary', 'Freelance', 'Other',
];

export default function AddTransactionPage() {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Add Transaction</h1>

      <form action={addTransaction} className="bg-white shadow-sm rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            required
            placeholder="e.g. Grocery shopping"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              step="0.01"
              required
              placeholder="0.00"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select name="type" required className="w-full border rounded-lg px-4 py-2">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select name="category" required className="w-full border rounded-lg px-4 py-2">
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
            defaultValue={new Date().toISOString().split('T')[0]}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
          <textarea
            name="notes"
            rows={2}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <a href="/dashboard" className="px-5 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
            Cancel
          </a>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}