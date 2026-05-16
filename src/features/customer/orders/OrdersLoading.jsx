const OrdersLoading = () => {
  return (
    <div className="co-state">
      <div className="co-spinner" />

      <p className="co-state__title">Loading Orders...</p>

      <p className="co-state__text">Fetching your latest scrap requests</p>
    </div>
  );
};

export default OrdersLoading;
