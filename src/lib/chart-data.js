export function getMonthlyTrend(transactions) {
  const monthlyData = {};

  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    if (!monthlyData[month]) {
      monthlyData[month] = { month, income: 0, expense: 0 };
    }
    if (t.type === 'income') {
      monthlyData[month].income += Number(t.amount);
    } else {
      monthlyData[month].expense += Number(t.amount);
    }
  });

  return Object.values(monthlyData);
}

export function getCategoryBreakdown(transactions) {
  const categoryData = {};

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      categoryData[t.category] = (categoryData[t.category] || 0) + Number(t.amount);
    });

  return Object.entries(categoryData).map(([name, value]) => ({ name, value }));
}