import { useSelector } from "react-redux";

import {
  getCartDiscount,
  getCartItemsCount,
  getCartMrpTotal,
  getCartTotal,
  getDiscountPercentage,
} from "../../cart/utils/cartUtils";

import { useNavigate } from "react-router-dom";

import "../styles/CartSummary.css";

const CartSummary = ({ hideCheckoutButton = false }) => {
  const items = useSelector((state) => state.cart.items);

  const navigate = useNavigate();

  const total = getCartTotal(items);

  const totalItems = getCartItemsCount(items);

  const mrpTotal = getCartMrpTotal(items);

  const discount = getCartDiscount(items);

  const discountPercentage = getDiscountPercentage(mrpTotal);

  return (
    <div className="cart-summary">
      <h2 className="cart-summary__title">Price Details</h2>

      <div className="cart-summary__row">
        <span>Items ({totalItems})</span>

        <span>₹{mrpTotal}</span>
      </div>

      <div className="cart-summary__row">
        <span>Discount ({discountPercentage}%)</span>

        <span className="green">− ₹{discount}</span>
      </div>

      <div className="cart-summary__row">
        <span>Delivery</span>

        <span className="green">Free</span>
      </div>

      <div className="cart-summary__divider" />

      <div className="cart-summary__total">
        <span>Total Amount</span>

        <span>₹{total}</span>
      </div>

      {discount > 0 && (
        <div
          style={{
            marginTop: "10px",
            fontSize: "13px",
            color: "#16a34a",
            fontWeight: "600",
          }}
        >
          🎉 You saved ₹{discount} on this order
        </div>
      )}

      {!hideCheckoutButton && (
        <button
          className="cart-summary__checkout"
          onClick={() => navigate("/checkout")}
        >
          Proceed To Checkout
        </button>
      )}
    </div>
  );
};

export default CartSummary;
