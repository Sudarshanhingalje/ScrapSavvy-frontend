import { useState } from "react";

const useOrderForm = () => {
  const [form, setForm] = useState({
    companyName: "",
    contactNo: "",
    scrapType: "Metal",
    quantity: "",
    pickupAddress: "",
    preferredDate: "",
  });

  const resetForm = () => {
    setForm({
      companyName: "",
      contactNo: "",
      scrapType: "Metal",
      quantity: "",
      pickupAddress: "",
      preferredDate: "",
    });
  };

  return {
    form,
    setForm,
    resetForm,
  };
};

export default useOrderForm;
