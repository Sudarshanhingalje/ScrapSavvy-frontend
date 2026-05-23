// src/features/customer/cart/components/myOrders/OrderFooter.jsx

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../redux/cartSlice";
import { cancelOrder, getOrderInvoice } from "../../api/orderApi";
import { BUTTON_CONFIG } from "../../utils/myOrderConstants";
import { generateProductInvoice } from "../ProductInvoice";
const OrderFooter = ({ order, setShowTrack, showTrack, onHide }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const statusKey = order.orderStatus?.toUpperCase();
  const buttons = BUTTON_CONFIG[statusKey] || BUTTON_CONFIG["PROCESSING"];
  const handleDownloadInvoice = async (orderId) => {
    try {
      const order = await getOrderInvoice(orderId);
      generateProductInvoice(order);
    } catch (err) {
      alert("Invoice generation failed");
    }
  };
  // BUY AGAIN
  const handleBuyAgain = () => {
    order.items.forEach((item) => {
      dispatch(
        addToCart({
          productId: item.productId,
          productName: item.productName,
          price: item.priceAtPurchase ?? item.price ?? 0,
          productImage: item.productImage,
          quantity: item.quantity,
        }),
      );
    });

    navigate("/checkout");
  };

  // CANCEL ORDER
  const handleCancel = async () => {
    try {
      await cancelOrder(order.orderId);
      window.location.reload();
    } catch (err) {
      alert(err.response?.data || "Cancel failed");
    }
  };

  const isCancelable =
    order.orderStatus === "PENDING" || order.orderStatus === "ACCEPTED";

  return (
    <div className="order-footer">
      {/* CANCEL */}
      {buttons.includes("cancelOrder") && isCancelable && (
        <button className="btn btn-cancel" onClick={handleCancel}>
          Cancel Order
        </button>
      )}

      {/* CLEAR / HIDE */}
      <button className="btn btn-clear" onClick={() => onHide(order.orderId)}>
        Clear from History
      </button>

      {/* TRACK */}
      {buttons.includes("trackOrder") && (
        <button
          className="btn btn-outline"
          onClick={() => setShowTrack(!showTrack)}
        >
          {showTrack ? "Hide Tracking" : "Track Order"}
        </button>
      )}

      {/* RATE */}
      {buttons.includes("rateReview") && (
        <button className="btn btn-rate">Rate & Review</button>
      )}
      {order.orderStatus === "DELIVERED" && (
        <button
          className="btn btn-primary"
          onClick={() => handleDownloadInvoice(order.orderId)}
        >
          Download Invoice
        </button>
      )}
      {order.orderStatus === "DELIVERED" && (
        <button
          className="btn btn-rate"
          // onClick={() => handleDownloadInvoice(order.orderId)}
        >
          Return Request
        </button>
      )}

      {/* BUY AGAIN */}
      {buttons.includes("buyAgain") && (
        <button className="btn btn-primary" onClick={handleBuyAgain}>
          Buy Again
        </button>
      )}
    </div>
  );
};

export default OrderFooter;
