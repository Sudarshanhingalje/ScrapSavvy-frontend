import { useState } from "react";

import "../../../features/customer/styles/Customerdashboard.css";

import CustomerSidebar from "../../../shared/layout/CustomerSidebar";

import CustomerLiveRates from "../../customer/dashboard/CustomerLiveRates";
import { AVAILABLE_ITEMS, RUNNING_ADS } from "../constants/customerConstants";
import AvailableItemsSection from "../dashboard/AvailableItemsSection";
import CustomerAdsBar from "../dashboard/CustomerAdsBar";
import CustomerTopbar from "../dashboard/CustomerTopbar";
import WishlistSection from "../dashboard/WishlistSection";

const CustomerDashboard = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      item: "Electric Motor (5HP)",
      maxPrice: 2000,
    },
    {
      id: 2,
      item: "Copper Pipes",
      maxPrice: 500,
    },
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

          {/* <ScrapRatesSection dailyRates={dailyRates} /> */}
          <CustomerLiveRates />
          <AvailableItemsSection items={AVAILABLE_ITEMS} />

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
