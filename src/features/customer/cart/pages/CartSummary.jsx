import { useSelector } from "react-redux";

import {
  getCartDiscount,
  getCartItemsCount,
  getCartMrpTotal,
  getCartTotal,
} from "../../cart/utils/cartUtils";

import { useNavigate } from "react-router-dom";
import "../styles/CartSummary.css";
const CartSummary = () => {
  const items = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const total = getCartTotal(items);

  const totalItems = getCartItemsCount(items);

  const mrpTotal = getCartMrpTotal(items);

  const discount = getCartDiscount(items);

  return (
    <div className="cart-summary">
      <h2 className="cart-summary__title">Price Details</h2>

      <div className="cart-summary__row">
        <span>Items ({totalItems})</span>
        <span>₹{mrpTotal}</span>
      </div>

      <div className="cart-summary__row">
        <span>Discount</span>

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
        <button
          className="cart-summary__checkout"
          onClick={() => navigate("/checkout")}
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
