import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CelebrationModal from "../../../../shared/components/CelebrationModal";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

import { clearCart } from "../../redux/cartSlice";
import { placeOrder } from "../api/orderApi";
import { createRazorpayOrder } from "../hooks/paymentApi";

import { RAZORPAY_KEY_ID } from "../../../../config/env";
import "../styles/CheckoutPage.css";

// ✅ Only use what cartUtils.js actually exports
import { getCartDiscount, getCartMrpTotal } from "../../cart/utils/cartUtils";

const CheckoutPage = () => {
  const items = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ✅ All values from cartUtils — react live to Redux state changes
  const subtotal = getCartMrpTotal(items); // price × qty (no GST, no discount)
  const discount = getCartDiscount(items); // discount amount
  const discountedSubtotal = subtotal - discount; // base for GST

  // GST applied on discounted subtotal
  const cgst = discountedSubtotal * 0.09;
  const sgst = discountedSubtotal * 0.09;
  const gst = discountedSubtotal * 0.18;

  // Final total = discounted subtotal + GST
  const total = discountedSubtotal + gst;

  const handleProceed = () => {
    if (items.length === 0) {
      alert("Cart is empty");
      return;
    }
    setShowPayment(true);
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const sdkLoaded = await loadRazorpay();
    if (!sdkLoaded) return alert("Razorpay SDK failed");

    try {
      const orderRes = await createRazorpayOrder(total);

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderRes.data.amount,
        currency: "INR",
        name: "ScrapSavvy",
        description: "Product Order",
        order_id: orderRes.data.orderId,

        handler: async (response) => {
          const payload = {
            userProfileId: user.userId,

            items: items.map((item) => ({
              productId: item.productId,
              qty: item.qty || item.quantity,
            })),

            subtotal,
            gst,
            cgst,
            sgst,
            totalAmount: total,

            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
          };

          await placeOrder(payload);

          dispatch(clearCart());
          setShowSuccess(true);

          setTimeout(() => navigate("/cuProductorders"), 2500);
        },

        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },

        theme: { color: "#16a34a" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.log(err);
      alert("Payment failed");
    }
  };

  return (
    <>
      <div className="checkout-page">
        <div className="checkout-left">
          <h1>Checkout</h1>
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>

        <div className="checkout-right">
          <CartSummary hideCheckoutButton />

          {/* ✅ Bill box — updates live with quantity changes */}
          <div className="bill-box">
            <div>Subtotal: ₹{subtotal.toFixed(2)}</div>
            {discount > 0 && <div>Discount: − ₹{discount.toFixed(2)}</div>}
            <div>CGST (9%): ₹{cgst.toFixed(2)}</div>
            <div>SGST (9%): ₹{sgst.toFixed(2)}</div>
            <hr />
            <b>Total: ₹{total.toFixed(2)}</b>
          </div>

          {!showPayment ? (
            <button className="checkout-btn" onClick={handleProceed}>
              Proceed To Payment
            </button>
          ) : (
            <div className="payment-section">
              <h3>Secure Payment</h3>
              <strong>Total: ₹{total.toFixed(2)}</strong>
              <button className="pay-btn" onClick={handlePayment}>
                Pay Now
              </button>
            </div>
          )}
        </div>
      </div>

      <CelebrationModal
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Order Placed Successfully!"
      />
    </>
  );
};

export default CheckoutPage;
