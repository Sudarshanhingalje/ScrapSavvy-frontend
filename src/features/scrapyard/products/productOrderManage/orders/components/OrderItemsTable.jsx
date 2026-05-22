const BASE_URL = "http://localhost:8080";

const OrderItemsTable = ({ items, totalAmount }) => {
  return (
    <div className="od-items-card">
      <div className="od-items-head">
        <span className="od-section-title" style={{ margin: 0 }}>
          Items Ordered
        </span>

        <span className="od-items-count">
          {items?.length} {items?.length === 1 ? "item" : "items"}
        </span>
      </div>

      {items?.map((item, index) => (
        <div key={index} className="od-item-row">
          <div className="od-item-img-wrap">
            {item.image ? (
              <img
                src={`${BASE_URL}${item.image}`}
                alt={item.productName}
                className="od-item-img"
              />
            ) : (
              <div className="od-item-img-placeholder">?</div>
            )}
          </div>

          <div className="od-item-info">
            <div className="od-item-name">{item.productName}</div>

            <div className="od-item-pid">Product ID: {item.productId}</div>
          </div>

          <div className="od-item-qty">Qty: {item.quantity}</div>

          <div className="od-item-price">
            ₹{item.price?.toLocaleString("en-IN")}
          </div>
        </div>
      ))}

      <div className="od-items-total">
        <span>
          Order Total ({items?.length} {items?.length === 1 ? "item" : "items"})
        </span>

        <strong>₹{totalAmount?.toLocaleString("en-IN")}</strong>
      </div>
    </div>
  );
};

export default OrderItemsTable;
