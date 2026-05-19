import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

import { placeOrder } from "../../cart/api/orderApi";
import { clearCart } from "../../redux/cartSlice";

import "../styles/CheckoutPage.css";

const CheckoutPage = () => {
  const items = useSelector((state) => state.cart.items);

  // ✅ FIX: get user from redux
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("User not logged in!");
      return;
    }

    const payload = {
      userProfileId: user.userId,
      items: items.map((item) => ({
        productId: item.productId,
        qty: item.qty,
      })),
    };

    try {
      const res = await placeOrder(payload);

      console.log("ORDER SUCCESS:", res.data);

      dispatch(clearCart());

      alert("Order placed successfully!");

      navigate("/orders");
    } catch (err) {
      console.log("ORDER FAILED:", err);
      alert("Order failed");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-left">
        <h1>Checkout</h1>

        {items.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </div>

      <div className="checkout-right">
        <CartSummary />

        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "green",
            color: "white",
            marginTop: "10px",
            cursor: "pointer",
          }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
