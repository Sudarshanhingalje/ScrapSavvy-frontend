const validateSellForm = (formData, items, images) => {
  if (!formData.customerName.trim()) {
    return "Customer name required";
  }

  if (!formData.contactNo.match(/^[0-9]{10}$/)) {
    return "Enter valid 10 digit mobile number";
  }

  if (!formData.pickupDate) {
    return "Please select pickup date";
  }

  if (!formData.pickupTime) {
    return "Please select pickup time";
  }

  if (!formData.pickupAddress.trim()) {
    return "Pickup address required";
  }

  if (items.length === 0) {
    return "Add at least 1 scrap item";
  }

  for (let item of items) {
    if (!item.materialType || !item.quantity) {
      return "Complete all scrap item fields";
    }
  }

  if (images.length === 0) {
    return "Upload at least 1 image";
  }

  return null;
};

export default validateSellForm;
