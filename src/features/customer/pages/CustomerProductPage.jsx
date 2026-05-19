import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../../../features/customer/styles/Customerdashboard.css";
import "../../../features/customer/styles/CustomerProductPage.css";

import CustomerSidebar from "../../../shared/layout/CustomerSidebar";

import { PRICE_KEYS } from "../constants/priceKeys";

import AvailableItemsSection from "../products/AvailableItemsSection";
import ProductDetailsModal from "../products/modal/ProductDetailsModal";

import { fetchProducts } from "../redux/customerProductSlice";

import CartBadge from "../cart/pages/CartBadge";
import CartDrawer from "../cart/pages/CartDrawer";

const CustomerProductPage = () => {
  const dispatch = useDispatch();

  const productState = useSelector((state) => state.product);

  const products = productState?.products || [];
  const loading = productState?.loading;
  const error = productState?.error;

  const { data: prices = {} } = useSelector((state) => state.scrapRates);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="cpp-layout">
      <CustomerSidebar />

      <div className="cpp-main">
        {/* TOPBAR */}
        <div className="cpp-topbar cpp-sticky-topbar">
          <div>
            <h1 className="cpp-topbar__title">Products</h1>
            <p className="cpp-topbar__sub">
              Browse scrap products from the yard
            </p>
          </div>

          {/* Live pill + CartBadge side by side */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span className="cd-live-pill">● Live</span>
            <CartBadge />
          </div>
        </div>

        {/* LIVE RATES */}
        <div className="rates-bar cpp-sticky-marquee">
          <span className="rates-label">📊 Live rates</span>
          <div className="rates-scroll-wrap">
            <div className="rates-inner">
              {[...PRICE_KEYS, ...PRICE_KEYS].map(({ icon, label, key }, i) => {
                const rate = prices?.[key]?.customerPrice;
                return (
                  <span key={`${key}-${i}`} className="rate-item">
                    {icon} {label} | {rate ? `₹${rate}/kg` : "--"}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* SEARCH + SORT */}
        <div className="ps-controls-row cpp-sticky-search">
          <input
            className="ps-search-input"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="ps-sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>

        {/* PRODUCTS */}
        <div className="cpp-scroll-area">
          {loading && <p>Loading products...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && !error && (
            <AvailableItemsSection
              products={products}
              search={search}
              sort={sort}
              onViewProduct={setSelectedProduct}
            />
          )}
        </div>
      </div>

      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* CART DRAWER — global, controlled by Redux */}
      <CartDrawer />
    </div>
  );
};

export default CustomerProductPage;
