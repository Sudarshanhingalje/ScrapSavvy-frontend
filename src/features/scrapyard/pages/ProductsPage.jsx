import { useState } from "react";

import LogoutMenu from "../../../shared/components/LogoutMenu";
import ScrapyardSidebar from "../../../shared/layout/ScrapyardSidebar";
import ProductForm from "../../scrapyard/products/product-form/ProductForm";
import productService from "../../scrapyard/services/productService";
import "../styles/ScrapyardDashboard.css";

const ProductsPage = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  const handleAddOrUpdate = async (formData) => {
    try {
      setLoading(true);

      if (editingProduct) {
        await productService.updateProduct(
          userId,
          editingProduct.productId,
          formData,
        );
      } else {
        await productService.addProduct(userId, formData);
      }

      setEditingProduct(null);
      alert("Success");
    } catch (error) {
      console.error(error);
      alert("Failed");
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return <div>❌ USER ID MISSING — Please login again</div>;
  }

  return (
    <div className="sd-layout">
      <ScrapyardSidebar />

      <div className="sd-main">
        <div className="sd-topbar">
          <h1>🛍️ Add / Edit Product</h1>
          <LogoutMenu />
        </div>

        <div className="sd-content">
          <div className="sd-card">
            <ProductForm
              onSubmit={handleAddOrUpdate}
              editingProduct={editingProduct}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
