import { useEffect, useState } from "react";

const initialState = {
  productName: "",
  description: "",
  price: "",
  quantity: "",
  imageUrl: "",
};

const ProductForm = ({ onSubmit, editingProduct }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    setFormData(initialState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-2xl shadow-sm p-5"
    >
      <h2 className="text-xl font-bold mb-5">
        {editingProduct ? "Update Product" : "Add Product"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3"
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3"
          required
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3"
        />
      </div>

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        rows={4}
        className="w-full border rounded-xl px-4 py-3 mt-4"
      />

      <button
        type="submit"
        className="mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold"
      >
        {editingProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
