# Sales Dashboard

A sales analytics dashboard built in React and Bootstrap - summary cards, a
monthly revenue chart, and a sortable/filterable orders table.

**[Live demo](https://developer-prachi.github.io/sales-dashboard/)** · **[Code](https://github.com/developer-prachi/sales-dashboard)**

**Note:** this uses static sample data (`src/data/orders.js`), not a live
API - it's a frontend-only dashboard demo. Swapping in a real API later
would only mean changing where `orders` comes from; every component below
it stays the same.

## Features

- Four summary cards (revenue, order count, pending count, average order
  value) computed from the raw order data
- A monthly revenue chart, built with plain CSS bars (no charting library)
- An orders table you can search by customer name, filter by status, and
  sort by clicking any column header (click again to reverse the order)

## Why there's no `useState` in `App.jsx`

The data here is static - nothing gets fetched, nothing changes on its
own - so there's genuinely nothing to hold in state at that level. All the
summary numbers and the chart data are just plain functions run on the
`orders` array. `OrdersTable` does have state (`searchText`, `statusFilter`,
`sortField`, `sortDirection`), but even the *filtered and sorted list itself*
isn't stored - it's recalculated on every render from those four values.
That's a deliberate choice: state should be the smallest set of values that
can't be derived from anything else; everything else gets computed as
needed.

## Stack

React 18, Vite, Bootstrap 5 (via CDN link in `index.html`).

## Project structure

```
src/
  App.jsx                  wires the three sections together, no state of its own
  index.css                 bar-chart and sortable-header styles Bootstrap doesn't have
  data/
    orders.js                static sample dataset
  utils/
    dashboardHelpers.js      summary math, monthly revenue grouping, currency formatting
  components/
    SummaryCards.jsx          the four stat cards
    RevenueChart.jsx          CSS-bar monthly revenue chart
    OrdersTable.jsx            search, filter, sort - all local state
```

## Running it locally

```bash
npm install
npm run dev
```

## Deploying

```bash
npm run deploy
```

Builds the app and pushes `dist/` to a `gh-pages` branch - enable GitHub
Pages on that branch in your repo settings. Or drag the `dist/` folder
(after `npm run build`) onto [app.netlify.com/drop](https://app.netlify.com/drop).
