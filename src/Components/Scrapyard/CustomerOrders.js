import { useEffect, useState } from "react";
import { fetchCustomerOrders } from "../../api/customerApi";
import ScrapyardSidebar from "../Common/ScrapyardSidebar";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const customerId = localStorage.getItem("userId");

    if (customerId) {
      fetchCustomerOrders(customerId).then(setOrders);
    }
  }, []);

  return (
    <div className="d-flex">
      <ScrapyardSidebar />

      <div className="flex-grow-1 p-4 bg-light min-vh-100">
        <h2>♻️ Customer Sell Orders</h2>

        {orders.length === 0 && <p>No orders found</p>}

        {orders.map((o) => (
          <div key={o.id} className="card p-3 mb-2">
            <b>{o.scrapType}</b>
            <div>{o.quantity} kg</div>
            <div>₹{o.totalPrice}</div>
            <div>Status: {o.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerOrders;
