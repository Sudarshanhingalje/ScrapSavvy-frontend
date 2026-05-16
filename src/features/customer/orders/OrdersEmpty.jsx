const OrdersEmpty = () => {
  return (
    <div className="co-state">
      <div className="co-state__icon">📭</div>

      <h4 className="co-state__title">No Scrap Orders Yet</h4>

      <p className="co-state__text">
        Your submitted scrap requests will appear here
      </p>
    </div>
  );
};

export default OrdersEmpty;
