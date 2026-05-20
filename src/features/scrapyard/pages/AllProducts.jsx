import { useCallback, useEffect, useState } from "react";

import LogoutMenu from "../../../shared/components/LogoutMenu";
import ScrapyardSidebar from "../../../shared/layout/ScrapyardSidebar";
import DeleteProductModal from "../../scrapyard/products/DeleteProductModal";
import ProductCard from "../../scrapyard/products/ProductCard";
import productService from "../../scrapyard/services/productService";
import "../styles/ScrapyardDashboard.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const userId = localStorage.getItem("userId");

  const fetchProducts = useCallback(async () => {
    if (!userId) {
      setProducts([]);
      return;
    }

    try {
      const data = await productService.getProducts(userId);
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch products failed", error);
      setProducts([]);
    }
  }, [userId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // OPEN MODAL
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  // CONFIRM DELETE
  const confirmDelete = async () => {
    try {
      await productService.deleteProduct(userId, selectedProduct.productId);

      setOpenModal(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Delete failed", error);
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
          <h1>🛍️ All Products</h1>
          <LogoutMenu />
        </div>

        <div className="sd-content">
          <div className="sd-prices-grid">
            {products.length === 0 ? (
              <p>No products found</p>
            ) : (
              products.map((product) => (
                <ProductCard
                  key={product.productId}
                  product={product}
                  onEdit={() => console.log("edit clicked")}
                  onDelete={handleDeleteClick}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <DeleteProductModal
        open={openModal}
        product={selectedProduct}
        onClose={() => setOpenModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default AllProducts;
