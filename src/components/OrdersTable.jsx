import { useState } from 'react';
import { formatCurrency } from '../utils/dashboardHelpers';

const STATUS_BADGE = {
  Completed: 'bg-success',
  Pending: 'bg-warning text-dark',
  Cancelled: 'bg-danger',
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
      <div className="card-body">
        <div className="d-flex flex-wrap gap-2 mb-3">
          <input
            type="text"
            className="form-control"
            style={{ maxWidth: '260px' }}
            placeholder="Search by customer…"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <select
            className="form-select"
            style={{ maxWidth: '180px' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                {COLUMNS.map((column) => (
                  <th
                    key={column.key}
                    className="sortable-header"
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
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>{formatCurrency(order.amount)}</td>
                  <td>
                    <span className={`badge ${STATUS_BADGE[order.status]}`}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {visibleOrders.length === 0 && (
          <p className="text-muted text-center mb-0">No orders match your filters.</p>
        )}
      </div>
    </div>
  );
}
