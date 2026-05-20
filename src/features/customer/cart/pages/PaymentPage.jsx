import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearCart } from "../../redux/cartSlice";
import { placeOrder } from "../api/orderApi";
import { createRazorpayOrder } from "../api/paymentApi";

import { RAZORPAY_KEY_ID } from "../../../../config/env";

const PaymentPage = () => {
  const items = useSelector((state) => state.cart.items);

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const total = items.reduce((sum, i) => {
    return sum + i.price * i.quantity;
  }, 0);

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
    const sdkLoaded = await loadRazorpay();

    if (!sdkLoaded) {
      alert("Razorpay SDK failed to load");

      return;
    }

    try {
      // create backend razorpay order
      const orderRes = await createRazorpayOrder(total);

      const options = {
        key: RAZORPAY_KEY_ID,

        amount: orderRes.data.amount,

        currency: "INR",

        name: "ScrapSavvy",

        description: "Order Payment",

        order_id: orderRes.data.orderId,

        handler: async function (response) {
          try {
            // SAVE ORDER IN DB

            const payload = {
              userProfileId: user.userId,

              items: items.map((item) => ({
                productId: item.productId,
                qty: item.quantity,
              })),
            };

            await placeOrder(payload);

            dispatch(clearCart());

            alert("✅ Payment Successful!");

            console.log("PAYMENT RESPONSE:", response);

            navigate("/cuProductorders");
          } catch (err) {
            console.log(err);

            alert("Order save failed");
          }
        },

        prefill: {
          name: user?.name || "",

          email: user?.email || "",
        },

        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();
    } catch (err) {
      console.log("PAYMENT ERROR:", err);

      alert("Payment failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Payment Page</h2>

      <h3>Total: ₹{total}</h3>

      <button
        onClick={handlePayment}
        style={{
          padding: "12px 20px",
          background: "blue",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "6px",
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
