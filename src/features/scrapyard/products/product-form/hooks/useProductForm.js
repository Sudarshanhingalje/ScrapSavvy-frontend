import { useEffect, useState } from "react";
import { initialState } from "../utils/initialState";

export const useProductForm = (editingProduct) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        ...initialState,
        productName: editingProduct.productName || "",
        description: editingProduct.description || "",
        price: editingProduct.price || "",
        mrp: editingProduct.mrp || "",
        quantity: editingProduct.quantity || "",
        categoryId: editingProduct.categoryId || "",
        brand: editingProduct.brand || "",
        model: editingProduct.model || "",
        images: editingProduct.images?.map((img) => ({ url: img })) || [],
        specifications:
          editingProduct.specifications || initialState.specifications,
        tags: editingProduct.tags || [],
      });
    } else {
      setFormData(initialState);
    }
  }, [editingProduct]);

  const handle = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSpec = (i, field, value) => {
    setFormData((p) => {
      const specs = [...p.specifications];
      specs[i] = { ...specs[i], [field]: value };
      return { ...p, specifications: specs };
    });
  };

  const addSpec = () =>
    setFormData((p) => ({
      ...p,
      specifications: [...p.specifications, { key: "", value: "" }],
    }));

  const removeSpec = (i) =>
    setFormData((p) => {
      const specs = [...p.specifications];
      specs.splice(i, 1);
      return { ...p, specifications: specs };
    });

  const setField = (key, value) => setFormData((p) => ({ ...p, [key]: value }));

  const reset = () => setFormData(initialState);

  return {
    formData,
    handle,
    handleSpec,
    addSpec,
    removeSpec,
    setField,
    reset,
  };
};
