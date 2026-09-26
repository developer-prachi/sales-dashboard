import { formatCurrency } from '../utils/dashboardHelpers';

const ICONS = {
  revenue: <path d="M12 3v18M16.5 7.5c0-1.9-2-3-4.5-3s-4.5 1.2-4.5 3.2c0 4.3 9 2.3 9 6.8 0 2-2 3.3-4.5 3.3s-4.5-1.2-4.5-3.2" />,
  orders: <path d="M5 7h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7Zm4 0V6a3 3 0 0 1 6 0v1" />,
  pending: <path d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  average: <path d="M4 19h16M7 16V10M12 16V5M17 16v-7" />,
};

export default function SummaryCards({ summary }) {
  const cards = [
    { label: 'Total Revenue', value: formatCurrency(summary.totalRevenue), icon: 'revenue', tone: 'var(--accent-soft)' },
    { label: 'Total Orders', value: summary.totalOrders, icon: 'orders', tone: 'var(--lilac)' },
    { label: 'Pending Orders', value: summary.pendingCount, icon: 'pending', tone: 'var(--peach)' },
    { label: 'Avg. Order Value', value: formatCurrency(summary.averageOrderValue), icon: 'average', tone: 'var(--mint)' },
  ];

  return (
    <div className="row g-3 mb-4">
      {cards.map((card) => (
        <div className="col-6 col-md-3" key={card.label}>
          <div className="card stat-card shadow-sm h-100">
            <span className="stat-card__icon" style={{ '--tone': card.tone }} aria-hidden="true">
              <svg viewBox="0 0 24 24">{ICONS[card.icon]}</svg>
            </span>
            <p className="stat-card__label">{card.label}</p>
            <p className="stat-card__value">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
