import SummaryCards from './components/SummaryCards';
import RevenueChart from './components/RevenueChart';
import OrdersTable from './components/OrdersTable';
import { SiteBar, SiteFooter } from './components/SiteChrome';
import { orders } from './data/orders';
import { computeSummary, computeMonthlyRevenue } from './utils/dashboardHelpers';

export default function App() {
  // This whole component has zero useState and zero useEffect - the data is
  // static, so there's nothing to fetch and nothing that changes on its
  // own. Everything below is plain math done on an array.
  const summary = computeSummary(orders);
  const monthlyRevenue = computeMonthlyRevenue(orders);

  return (
    <>
      <SiteBar title="Sales Dashboard" />
      <main className="container page">
        <header className="mb-4">
          <p className="eyebrow">Sample data &middot; no backend</p>
          <h1 className="page-title">
            Sales <em className="accent-em">Dashboard</em>
          </h1>
          <p className="lede mb-0">Revenue, order counts and a searchable orders table, all computed from a static dataset.</p>
        </header>

        <SummaryCards summary={summary} />
        <RevenueChart data={monthlyRevenue} />
        <OrdersTable orders={orders} />
      </main>
      <SiteFooter repo="sales-dashboard" />
    </>
  );
}
