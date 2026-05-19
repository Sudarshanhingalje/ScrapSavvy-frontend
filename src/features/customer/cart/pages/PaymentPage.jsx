import { useSelector } from "react-redux";
import { createRazorpayOrder } from "../api/paymentApi";

const PaymentPage = () => {
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    // create order from backend
    const orderRes = await createRazorpayOrder(total);

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: orderRes.data.amount,
      currency: "INR",
      name: "ScrapSavvy",
      description: "Order Payment",
      order_id: orderRes.data.orderId,

      handler: function (response) {
        alert("Payment Successful!");
        console.log(response);
      },

      prefill: {
        name: "User",
        email: "user@example.com",
      },

      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Payment Page</h2>

      <h3>Total: ₹{total}</h3>

      <button
        onClick={handlePayment}
        style={{
          padding: "10px",
          background: "blue",
          color: "white",
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
