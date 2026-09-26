import { formatCurrency } from '../utils/dashboardHelpers';

// A "chart" here is just divs with dynamic heights - no charting library.
// Same technique as a progress bar: render the value as a percentage width
// or height instead of pulling in a whole new dependency for it.
export default function RevenueChart({ data }) {
  const highest = Math.max(...data.map((item) => item.revenue), 1);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="h6 mb-3">Monthly Revenue</h2>
        <div className="bar-chart">
          {data.map((item) => (
            <div className="bar-chart__column" key={item.month}>
              <div
                className="bar-chart__bar"
                style={{ height: `${(item.revenue / highest) * 100}%` }}
                title={formatCurrency(item.revenue)}
              />
              <span className="small text-muted mt-2">{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
