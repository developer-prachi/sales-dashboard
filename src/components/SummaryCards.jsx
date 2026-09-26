import { formatCurrency } from '../utils/dashboardHelpers';

export default function SummaryCards({ summary }) {
  const cards = [
    { label: 'Total Revenue', value: formatCurrency(summary.totalRevenue) },
    { label: 'Total Orders', value: summary.totalOrders },
    { label: 'Pending Orders', value: summary.pendingCount },
    { label: 'Avg. Order Value', value: formatCurrency(summary.averageOrderValue) },
  ];

  return (
    <div className="row g-3 mb-4">
      {cards.map((card) => (
        <div className="col-6 col-md-3" key={card.label}>
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted small mb-1">{card.label}</p>
              <p className="h4 mb-0">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
