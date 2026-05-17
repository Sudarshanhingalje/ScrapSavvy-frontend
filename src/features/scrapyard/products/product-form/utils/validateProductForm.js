export const validateProductForm = (formData) => {
  if (formData.images.length < 1) {
    return { valid: false, message: "Please add at least 1 product image." };
  }
  return { valid: true, message: "" };
};
