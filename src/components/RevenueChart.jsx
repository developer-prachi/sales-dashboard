import { formatCurrency } from '../utils/dashboardHelpers';

// A "chart" here is just divs with dynamic heights - no charting library.
// Same technique as a progress bar: render the value as a percentage width
// or height instead of pulling in a whole new dependency for it.
export default function RevenueChart({ data }) {
  const highest = Math.max(...data.map((item) => item.revenue), 1);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body p-4">
        <h2 className="panel-title">Monthly revenue</h2>
        <p className="panel-sub">Completed orders only</p>
        <div className="bar-chart">
          {data.map((item) => (
            <div className="bar-chart__column" key={item.month} title={formatCurrency(item.revenue)}>
              <span className="bar-chart__value">{formatCurrency(item.revenue)}</span>
              <div className="bar-chart__bar" style={{ height: `${(item.revenue / highest) * 80}%` }} />
            </div>
          ))}
        </div>
        <div className="bar-chart__labels">
          {data.map((item) => (
            <span key={item.month}>{item.month}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
