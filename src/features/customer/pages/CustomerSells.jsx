//
import { useState } from "react";
import Swal from "sweetalert2";

import CustomerSidebar from "../../../shared/layout/CustomerSidebar";

import ImageUploadCard from "../components/ImageUploadCard";
import SellItemsCard from "../orders/SellItemsCard";
import TotalCard from "../components/TotalCard";

import useCustomerSell from "../hooks/useCustomerSell";

import calculateGrandTotal from "../utils/calculateGrandTotal";
import validateSellForm from "../utils/validateSellForm";

import PickupDetailsCard from "../components/PickupDetailsCard";
import { createCustomerSellOrder } from "../services/customerSellApi";
const CustomerSells = () => {
  const rates = useCustomerSell();

  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);

  const [items, setItems] = useState([
    {
      materialType: "",
      quantity: "",
      pricePerKg: 0,
      total: 0,
    },
  ]);

  const [formData, setFormData] = useState({
    customerName: "",
    pickupAddress: "",
    contactNo: "",
    pickupDate: "",
    pickupTime: "",
  });

  const handleItemChange = (index, field, value) => {
    const updated = [...items];

    updated[index][field] = value;

    if (field === "materialType") {
      updated[index].pricePerKg = rates[value] || 0;
    }

    const qty = Number(updated[index].quantity || 0);

    const price = Number(updated[index].pricePerKg || 0);

    updated[index].total = qty * price;

    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        materialType: "",
        quantity: "",
        pricePerKg: 0,
        total: 0,
      },
    ]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleImages = (e) => {
    setImages([...e.target.files]);
  };

  const grandTotal = calculateGrandTotal(items);

  const submitOrder = async () => {
    const error = validateSellForm(formData, items, images);

    if (error) {
      Swal.fire({
        icon: "warning",
        title: error,
      });

      return;
    }

    try {
      setLoading(true);

      const form = new FormData();

      const orderData = {
        customerName: formData.customerName,
        ownerId: 2,
        customerId: Number(localStorage.getItem("customerId")),
        orderType: "CUSTOMER",
        status: "PENDING",
        pickupAddress: formData.pickupAddress,
        contactNo: formData.contactNo,
        pickupDate: formData.pickupDate,
        pickupTime: formData.pickupTime,
        totalPrice: grandTotal,
        items,
      };

      form.append(
        "order",
        new Blob([JSON.stringify(orderData)], {
          type: "application/json",
        }),
      );

      images.forEach((img) => {
        form.append("images", img);
      });

      const token = localStorage.getItem("token");

      await createCustomerSellOrder(form, token);

      Swal.fire({
        icon: "success",
        title: "Request Submitted Successfully 🎉",
        text: "Our scrapyard team will contact you soon.",
      });
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <CustomerSidebar />

      <div className="flex-grow-1 p-4 bg-light min-vh-100">
        <div className="container-fluid">
          <h2 className="mb-2">♻️ Sell Scrap</h2>

          <p className="text-muted">Sell your scrap and earn money</p>

          <hr />

          <SellItemsCard
            items={items}
            rates={rates}
            handleItemChange={handleItemChange}
            addItem={addItem}
            removeItem={removeItem}
          />
          <PickupDetailsCard formData={formData} setFormData={setFormData} />
          <ImageUploadCard handleImages={handleImages} />

          <TotalCard
            grandTotal={grandTotal}
            submitOrder={submitOrder}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerSells;
