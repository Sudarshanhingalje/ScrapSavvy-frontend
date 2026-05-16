// ProductsPage.jsx

import { useEffect, useState } from "react";

import LogoutMenu from "../../../shared/components/LogoutMenu";
import ScrapyardSidebar from "../../../shared/layout/ScrapyardSidebar";

import scrapyardService from "../../../shared/services/ScrapyardService";

import ProductCard from "../products/ProductCard";
import ProductForm from "../products/ProductForm";

import "../styles/ScrapyardDashboard.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const userId = localStorage.getItem("userId");

  const fetchProducts = async () => {
    try {
      const response = await scrapyardService.GetMyAllProducts(userId);

      setProducts(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddOrUpdate = async (formData) => {
    try {
      if (editingProduct) {
        await scrapyardService.UpdateProduct(userId, formData);
      } else {
        await scrapyardService.AddProduct(userId, formData);
      }

      setEditingProduct(null);

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await scrapyardService.DeleteProduct(userId, productId);

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="scrapyard-page">
      <ScrapyardSidebar />

      <div className="scrapyard-main">
        {/* HEADER */}
        <div className="scrapyard-header">
          <div className="scrapyard-header-left">
            <h1>🛍️ Products Management</h1>

            <p>Manage scrapyard products and inventory listings</p>
          </div>

          <LogoutMenu />
        </div>

        {/* BODY */}
        <div className="scrapyard-content">
          {/* FORM */}
          <div className="dashboard-card">
            <div className="dashboard-card-title">
              {editingProduct ? "✏️ Edit Product" : "➕ Add Product"}
            </div>

            <ProductForm
              onSubmit={handleAddOrUpdate}
              editingProduct={editingProduct}
            />
          </div>

          {/* PRODUCTS */}
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
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
