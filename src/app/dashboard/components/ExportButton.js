'use client';

export default function ExportButton({ transactions }) {
  const handleExport = () => {
    const headers = ['Title', 'Type', 'Category', 'Amount', 'Date', 'Notes'];
    const rows = transactions.map((t) => [
      t.title,
      t.type,
      t.category,
      t.amount,
      new Date(t.date).toLocaleDateString(),
      t.notes || '',
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((val) => `"${val}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleExport} className="text-sm bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
      Export CSV
    </button>
  );
}