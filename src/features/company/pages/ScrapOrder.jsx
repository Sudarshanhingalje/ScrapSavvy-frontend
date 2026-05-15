import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CompanySidebar from "../../../shared/layout/CompanySidebar";

import "../styles/ScrapSale.css";

import CelebrationModal from "../../../shared/components/CelebrationModal";
import ScrapForm from "../../company/dashboard/ScrapForm";
import StepBar from "../../company/dashboard/StepBar";
import OrderSummary from "../dashboard/OrderSummary";

import useOrderForm from "../../company/hooks/useOrderForm";

import { createScrapOrder } from "../services/scrapSaleApi";
import { calculateTotal } from "../utils/calculateTotal";
import { validateOrder } from "../utils/validateOrder";

const ScrapSale = () => {
  const navigate = useNavigate();

  // ✅ RTK GLOBAL STATE
  const rates = useSelector((state) => state.scrapRates?.data || {});

  const { form, setForm, resetForm } = useOrderForm();

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // 🎉 CELEBRATION STATE (FIX)
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const price = rates?.[form?.scrapType]?.companyPrice || 0;
    const qty = Number(form?.quantity || 0);

    setTotal(calculateTotal(price, qty));
  }, [form.scrapType, form.quantity, rates]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: false,
    });
  };

  const selectType = (type) => {
    setForm({
      ...form,
      scrapType: type,
    });
  };

  const placeOrder = async () => {
    const validationErrors = validateOrder(form);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("❌ You are not logged in");
      return;
    }

    try {
      setLoading(true);

      await createScrapOrder(
        {
          companyName: form.companyName,
          contactNo: form.contactNo,
          scrapType: form.scrapType,
          quantity: Number(form.quantity),
          pickupAddress: form.pickupAddress,
          preferredDate: form.preferredDate,
          orderType: "COMPANY",
          ownerId: 2,
        },
        token,
      );

      resetForm();

      // 🎉 SHOW CELEBRATION FIRST
      setShowCelebration(true);

      // ⏳ NAVIGATE AFTER MODAL
      setTimeout(() => {
        setShowCelebration(false);
        navigate("/company-dashboard");
      }, 2500);
    } catch (err) {
      console.error(err);
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ss-shell">
      <CompanySidebar />

      {/* 🎉 GLOBAL MODAL (MUST BE HERE, NOT INSIDE FUNCTION) */}
      <CelebrationModal
        show={showCelebration}
        message="Order placed successfully 🚀"
        onClose={() => setShowCelebration(false)}
      />

      <div className="ss-main">
        <StepBar />

        <div className="ss-page">
          <ScrapForm
            form={form}
            errors={errors}
            handleChange={handleChange}
            selectType={selectType}
          />

          <OrderSummary
            form={form}
            rates={rates}
            total={total}
            loading={loading}
            placeOrder={placeOrder}
            resetForm={resetForm}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrapSale;
