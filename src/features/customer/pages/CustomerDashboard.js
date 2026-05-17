import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../../../features/customer/styles/Customerdashboard.css";

import CustomerSidebar from "../../../shared/layout/CustomerSidebar";
import CustomerLiveRates from "../../customer/dashboard/CustomerLiveRates";

import { fetchProducts } from "../redux/customerProductSlice";

import { RUNNING_ADS } from "../constants/customerConstants";
import CustomerAdsBar from "../dashboard/CustomerAdsBar";
import CustomerTopbar from "../dashboard/CustomerTopbar";
import WishlistSection from "../dashboard/WishlistSection";

const CustomerDashboard = () => {
  const dispatch = useDispatch();

  // ✅ SAFE SELECTOR (NO CRASH EVER)
  const productState = useSelector((state) => state.product);

  const products = productState?.products || [];
  const loading = productState?.loading;
  const error = productState?.error;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [wishlist, setWishlist] = useState([
    { id: 1, item: "Electric Motor (5HP)", maxPrice: 2000 },
    { id: 2, item: "Copper Pipes", maxPrice: 500 },
  ]);

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="cd-layout">
      <CustomerSidebar />

      <div className="cd-main">
        <CustomerTopbar />

        <div className="cd-content">
          <CustomerAdsBar ads={RUNNING_ADS} />
          <CustomerLiveRates />

          {loading && <p>Loading products...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* <AvailableItemsSection products={products} /> */}

          <WishlistSection
            wishlist={wishlist}
            removeFromWishlist={removeFromWishlist}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
