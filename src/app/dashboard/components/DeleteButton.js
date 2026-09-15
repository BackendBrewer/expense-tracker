'use client';

import { deleteTransaction } from '../actions';
import { useTransition } from 'react';

export default function DeleteButton({ id }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm('Delete this transaction?')) return;
    startTransition(() => deleteTransaction(id));
  };

  return (
    <button onClick={handleDelete} disabled={isPending} className="text-red-600 hover:underline text-sm">
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}