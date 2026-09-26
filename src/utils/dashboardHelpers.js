export function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function getMonthLabel(dateString) {
  const date = new Date(dateString);
  return MONTH_NAMES[date.getMonth()];
}

// Turns the raw orders list into the four summary numbers shown at the top
// of the dashboard. All plain array methods - reduce, filter - no state
// needed, since it's just math done on data we already have.
export function computeSummary(orders) {
  const completedOrders = orders.filter((o) => o.status === 'Completed');
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.amount, 0);
  const pendingCount = orders.filter((o) => o.status === 'Pending').length;
  const averageOrderValue = completedOrders.length
    ? Math.round(totalRevenue / completedOrders.length)
    : 0;

  return {
    totalRevenue,
    totalOrders: orders.length,
    pendingCount,
    averageOrderValue,
  };
}

// Groups completed orders by month and totals the revenue for each one,
// in calendar order - this is what the bar chart draws.
export function computeMonthlyRevenue(orders) {
  const totalsByMonth = {};

  orders
    .filter((o) => o.status === 'Completed')
    .forEach((o) => {
      const label = getMonthLabel(o.date);
      totalsByMonth[label] = (totalsByMonth[label] || 0) + o.amount;
    });

  return MONTH_NAMES
    .filter((month) => totalsByMonth[month] !== undefined)
    .map((month) => ({ month, revenue: totalsByMonth[month] }));
}
