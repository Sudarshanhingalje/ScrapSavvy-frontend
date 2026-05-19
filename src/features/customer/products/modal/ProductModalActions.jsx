import { useDispatch } from "react-redux";
import { addToCart, openCart } from "../../redux/cartSlice";

const ProductModalActions = ({ product, qty, setQty, inStock }) => {
  const dispatch = useDispatch();

  // ✅ ADD TO CART (FIXED VERSION)
  const handleAddToCart = () => {
    if (!inStock) return;

    dispatch(
      addToCart({
        productId: product.productId,
        productName: product.productName,
        price: product.price,
        quantity: qty,
        image: product.image || null,
      }),
    );

    dispatch(openCart());
  };

  return (
    <div className="pdm-buy-bar">
      {/* PRICE DISPLAY */}
      <div className="pdm-buy-bar-price">
        <span className="pdm-buy-bar-amount">
          ₹{Number(product?.price * qty).toLocaleString("en-IN")}
        </span>

        <span className="pdm-buy-bar-label">
          {qty} × ₹{Number(product?.price).toLocaleString("en-IN")}
        </span>
      </div>

      {/* QTY CONTROLS */}
      <div className="pdm-qty-stepper">
        <button
          onClick={() => setQty((p) => Math.max(1, p - 1))}
          disabled={qty <= 1}
        >
          −
        </button>

        <span>{qty}</span>

        <button
          onClick={() => setQty((p) => Math.min(product.quantity, p + 1))}
          disabled={!inStock || qty >= product.quantity}
        >
          +
        </button>
      </div>

      {/* ACTION BUTTONS */}
      <div className="pdm-buy-actions">
        <button
          className="pdm-cart-btn"
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          🛒 {inStock ? "Add to cart" : "Out of stock"}
        </button>

        <button
          className="pdm-buy-btn"
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          ⚡ Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductModalActions;
