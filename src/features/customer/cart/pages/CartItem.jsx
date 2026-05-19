import { useDispatch } from "react-redux";

import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../redux/cartSlice";

import { API_BASE_URL } from "../../../../config/env";

import "../styles/CartItem.css";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const image = item?.images?.[0]
    ? `${API_BASE_URL}${item.images[0]}`
    : "https://placehold.co/100x100?text=No+Image";

  return (
    <div className="cart-item">
      <img src={image} alt={item.productName} className="cart-item__image" />

      <div className="cart-item__content">
        <h3 className="cart-item__title">{item.productName}</h3>

        <p className="cart-item__brand">{item.brand}</p>

        <div className="cart-item__price-row">
          <span className="cart-item__price">₹{item.price}</span>

          {item.mrp && <span className="cart-item__mrp">₹{item.mrp}</span>}
        </div>

        <div className="cart-item__bottom">
          <div className="cart-item__qty">
            <button onClick={() => dispatch(decreaseQuantity(item.productId))}>
              −
            </button>

            <span>{item.qty}</span>

            <button onClick={() => dispatch(increaseQuantity(item.productId))}>
              +
            </button>
          </div>

          <button
            className="cart-item__remove"
            onClick={() => dispatch(removeFromCart(item.productId))}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
