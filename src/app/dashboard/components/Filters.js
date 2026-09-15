'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const categories = ['Food', 'Transport', 'Bills', 'Entertainment', 'Shopping', 'Health', 'Education', 'Salary', 'Freelance', 'Other'];

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <div className="bg-white shadow-sm rounded-xl p-4 flex flex-wrap gap-3 items-end">
      <div>
        <label className="block text-xs text-gray-500 mb-1">Type</label>
        <select
          defaultValue={searchParams.get('type') || ''}
          onChange={(e) => updateFilter('type', e.target.value)}
          className="border rounded-lg px-3 py-1.5 text-sm"
        >
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">Category</label>
        <select
          defaultValue={searchParams.get('category') || ''}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="border rounded-lg px-3 py-1.5 text-sm"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">From</label>
        <input
          type="date"
          defaultValue={searchParams.get('from') || ''}
          onChange={(e) => updateFilter('from', e.target.value)}
          className="border rounded-lg px-3 py-1.5 text-sm"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">To</label>
        <input
          type="date"
          defaultValue={searchParams.get('to') || ''}
          onChange={(e) => updateFilter('to', e.target.value)}
          className="border rounded-lg px-3 py-1.5 text-sm"
        />
      </div>

      <button onClick={() => router.push('/dashboard')} className="text-sm text-gray-500 hover:underline">
        Clear
      </button>
    </div>
  );
}