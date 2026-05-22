const OrderFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="filters-toolbar">
      <div className="search-wrap">
        <span className="search-icon">&#9906;</span>
        <input
          type="text"
          placeholder="Search by buyer name or order ID…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="ALL">All statuses</option>
        <option value="PENDING">Pending</option>
        <option value="ACCEPTED">Accepted</option>
        <option value="PACKED">Packed</option>
        <option value="SHIPPED">Shipped</option>
        <option value="DELIVERED">Delivered</option>
        <option value="CANCELLED">Cancelled</option>
      </select>

      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
      >
        <option value="ALL">All types</option>
        <option value="COMPANY">Company</option>
        <option value="INDIVIDUAL">Customer</option>
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="amount_desc">Amount ↓</option>
        <option value="amount_asc">Amount ↑</option>
      </select>
    </div>
  );
};

export default OrderFilters;
