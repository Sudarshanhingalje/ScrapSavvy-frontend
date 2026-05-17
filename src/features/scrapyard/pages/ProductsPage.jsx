// ProductsPage.jsx

import { useEffect, useState } from "react";

import LogoutMenu from "../../../shared/components/LogoutMenu";
import ScrapyardSidebar from "../../../shared/layout/ScrapyardSidebar";

import productService from "../services/productService";

import ProductForm from "../../scrapyard/products/product-form/ProductForm";
import ProductCard from "../products/ProductCard";

import "../styles/ScrapyardDashboard.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  const fetchProducts = async () => {
    try {
      const data = await productService.getProducts(userId);

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch products failed", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddOrUpdate = async (formData) => {
    try {
      setLoading(true);

      if (editingProduct) {
        await productService.updateProduct(
          userId,
          editingProduct.productId,
          formData,
        );

        alert("Product updated successfully");
      } else {
        await productService.addProduct(userId, formData);

        alert("Product added successfully");
      }

      setEditingProduct(null);

      fetchProducts();
    } catch (error) {
      console.error(error);

      alert(error?.response?.data?.message || "Product add/update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await productService.deleteProduct(userId, productId);

      alert("Product deleted");

      fetchProducts();
    } catch (error) {
      console.error(error);

      alert("Delete failed");
    }
  };

  return (
    <div className="sd-layout">
      <ScrapyardSidebar />

      <div className="sd-main">
        <div className="sd-topbar">
          <div>
            <p className="sd-subtitle">ScrapSavvy · Owner Panel</p>

            <h1 className="sd-title">🛍️ Products Management</h1>
          </div>

          <LogoutMenu />
        </div>

        <div className="sd-content">
          <div className="sd-card">
            <div className="sd-card-title">
              {editingProduct ? "✏️ Edit Product" : "➕ Add Product"}
            </div>

            <ProductForm
              onSubmit={handleAddOrUpdate}
              editingProduct={editingProduct}
              loading={loading}
            />
          </div>

          <div className="sd-prices-grid">
            {products.map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
                onEdit={setEditingProduct}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
