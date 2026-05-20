import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

import "../styles/CheckoutPage.css";

const CheckoutPage = () => {
  const items = useSelector((state) => state.cart.items);

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Cart is empty");
      return;
    }

    navigate("/payment");
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
          onClick={handleCheckout}
        >
          Proceed To Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
