import { useState } from 'react';
import { formatCurrency } from '../utils/dashboardHelpers';

const STATUS_PILL = {
  Completed: 'status-pill--completed',
  Pending: 'status-pill--pending',
  Cancelled: 'status-pill--cancelled',
};

const COLUMNS = [
  { key: 'id', label: 'Order ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
];

// All of this table's filter/sort state lives right here, not in App - the
// rest of the dashboard doesn't need to know about it.
export default function OrdersTable({ orders }) {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  function handleSort(field) {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }

  // Filtered and sorted fresh on every render - no state, no effect. It's
  // cheap to recompute and there's nothing to keep in sync by hand this way.
  const visibleOrders = orders
    .filter((order) => order.customer.toLowerCase().includes(searchText.toLowerCase()))
    .filter((order) => statusFilter === 'All' || order.status === statusFilter)
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      if (typeof a[sortField] === 'number') {
        return (a[sortField] - b[sortField]) * direction;
      }
      return a[sortField].localeCompare(b[sortField]) * direction;
    });

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <div className="toolbar">
          <div>
            <h2 className="panel-title">Orders</h2>
            <p className="panel-sub">Click a column header to sort</p>
          </div>
          <div className="toolbar__controls">
            <div className="search-field">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <input
                type="text"
                className="form-control"
                style={{ width: '240px', maxWidth: '100%' }}
                placeholder="Search by customer…"
                aria-label="Search by customer"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <select
              className="form-select"
              style={{ width: '170px' }}
              aria-label="Filter by status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle orders-table">
            <thead>
              <tr>
                {COLUMNS.map((column) => (
                  <th
                    key={column.key}
                    className={`sortable-header ${sortField === column.key ? 'is-sorted' : ''}`}
                    onClick={() => handleSort(column.key)}
                  >
                    {column.label}
                    {sortField === column.key && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>{formatCurrency(order.amount)}</td>
                  <td>
                    <span className={`status-pill ${STATUS_PILL[order.status]}`}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {visibleOrders.length === 0 && (
          <p className="text-muted text-center mt-3 mb-0">No orders match your filters.</p>
        )}
      </div>
    </div>
  );
}
