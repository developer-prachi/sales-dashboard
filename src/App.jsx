import SummaryCards from './components/SummaryCards';
import RevenueChart from './components/RevenueChart';
import OrdersTable from './components/OrdersTable';
import { orders } from './data/orders';
import { computeSummary, computeMonthlyRevenue } from './utils/dashboardHelpers';

export default function App() {
  // This whole component has zero useState and zero useEffect - the data is
  // static, so there's nothing to fetch and nothing that changes on its
  // own. Everything below is plain math done on an array.
  const summary = computeSummary(orders);
  const monthlyRevenue = computeMonthlyRevenue(orders);

  return (
    <div className="container py-5" style={{ maxWidth: '1000px' }}>
      <h1 className="mb-1">Sales Dashboard</h1>
      <p className="text-muted mb-4">Sample data - no backend, just a static dataset.</p>

      <SummaryCards summary={summary} />
      <RevenueChart data={monthlyRevenue} />
      <OrdersTable orders={orders} />
    </div>
  );
}
