import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../../../features/customer/styles/Customerdashboard.css";
import "../../../features/customer/styles/CustomerProductPage.css";

import CustomerSidebar from "../../../shared/layout/CustomerSidebar";
import AvailableItemsSection from "../products/AvailableItemsSection";
import { fetchProducts } from "../redux/customerProductSlice";

const CustomerProductPage = () => {
  const dispatch = useDispatch();

  const productState = useSelector((state) => state.product);
  const products = productState?.products || [];
  const loading = productState?.loading;
  const error = productState?.error;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="cpp-layout">
      {/* LEFT — original sidebar, zero changes */}
      <CustomerSidebar />

      {/* RIGHT — scrollable main area */}
      <div className="cpp-main">
        {/* Blue topbar */}
        <div className="cpp-topbar">
          <div>
            <h1 className="cpp-topbar__title">Products</h1>
            <p className="cpp-topbar__sub">
              Browse scrap products from the yard
            </p>
          </div>
          <span className="cd-live-pill">● Live</span>
        </div>

        {/* Page body */}
        <div className="cpp-content">
          {loading && <p className="cd-loading-text">Loading products...</p>}
          {error && (
            <p style={{ color: "var(--color-danger)", fontSize: 14 }}>
              {error}
            </p>
          )}
          {!loading && !error && <AvailableItemsSection products={products} />}
        </div>
      </div>
    </div>
  );
};

export default CustomerProductPage;
