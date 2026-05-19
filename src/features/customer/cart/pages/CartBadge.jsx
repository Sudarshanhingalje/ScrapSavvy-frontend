import { useDispatch, useSelector } from "react-redux";

import { toggleCart } from "../../redux/cartSlice";

const CartBadge = () => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);

  const totalCount = items.reduce((total, item) => total + item.qty, 0);

  return (
    <button
      onClick={() => dispatch(toggleCart())}
      style={{
        position: "relative",
        border: "none",
        background: "none",
        fontSize: "26px",
        cursor: "pointer",
      }}
    >
      🛒
      {totalCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-6px",
            right: "-10px",
            background: "red",
            color: "#fff",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
          }}
        >
          {totalCount}
        </span>
      )}
    </button>
  );
};

export default CartBadge;
