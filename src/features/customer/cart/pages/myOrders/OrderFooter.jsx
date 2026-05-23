// src/features/customer/cart/pages/myOrders/OrderFooter.jsx

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../redux/cartSlice";
import { cancelOrder, getOrderInvoice } from "../../api/orderApi";
import { BUTTON_CONFIG } from "../../utils/myOrderConstants";
import { generateProductInvoice } from "../ProductInvoice";
import RateReviewModal from "../myOrders/RateReviewModal";

const OrderFooter = ({ order, setShowTrack, showTrack, onHide }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showRateModal, setShowRateModal] = useState(false);

  const statusKey = order.orderStatus?.toUpperCase();
  const buttons = BUTTON_CONFIG[statusKey] || BUTTON_CONFIG["PROCESSING"];

  const handleDownloadInvoice = async (orderId) => {
    try {
      const inv = await getOrderInvoice(orderId);
      generateProductInvoice(inv);
    } catch (err) {
      alert("Invoice generation failed");
    }
  };

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
    <>
      <div className="order-footer">
        {/* CANCEL */}
        {buttons.includes("cancelOrder") && isCancelable && (
          <button className="btn btn-cancel" onClick={handleCancel}>
            Cancel Order
          </button>
        )}

        {/* CLEAR */}
        <button className="btn btn-clear" onClick={() => onHide(order.orderId)}>
          Clear from History
        </button>

        {/* TRACK */}
        {buttons.includes("trackOrder") && (
          <button
            className={`btn ${showTrack ? "btn-primary" : "btn-outline"}`}
            onClick={() => setShowTrack(!showTrack)}
          >
            {showTrack ? "Hide Tracking" : "Track Order"}
          </button>
        )}

        {/* RATE & REVIEW */}
        {buttons.includes("rateReview") && (
          <button
            className="btn btn-rate"
            onClick={() => setShowRateModal(true)}
          >
            Rate &amp; Review
          </button>
        )}

        {/* INVOICE */}
        {order.orderStatus === "DELIVERED" && (
          <button
            className="btn btn-primary"
            onClick={() => handleDownloadInvoice(order.orderId)}
          >
            Download Invoice
          </button>
        )}

        {/* RETURN */}
        {order.orderStatus === "DELIVERED" && (
          <button className="btn btn-rate">Return Request</button>
        )}

        {/* BUY AGAIN */}
        {buttons.includes("buyAgain") && (
          <button className="btn btn-primary" onClick={handleBuyAgain}>
            Buy Again
          </button>
        )}
      </div>

      {/* RATE & REVIEW MODAL */}
      {showRateModal && (
        <RateReviewModal
          order={order}
          onClose={() => setShowRateModal(false)}
        />
      )}
    </>
  );
};

export default OrderFooter;
