import { useDispatch, useSelector } from "react-redux";

import { closeCart } from "../../redux/cartSlice";

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";

import "../styles/CartDrawer.css";

const CartDrawer = () => {
  const dispatch = useDispatch();

  const { items, isCartOpen } = useSelector((state) => state.cart);

  if (!isCartOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={() => dispatch(closeCart())}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer__header">
          <h2>Your Cart</h2>

          <button onClick={() => dispatch(closeCart())}>✕</button>
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="cart-drawer__items">
              {items.map((item) => (
                <CartItem key={item.productId} item={item} />
              ))}
            </div>

            <CartSummary />
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
