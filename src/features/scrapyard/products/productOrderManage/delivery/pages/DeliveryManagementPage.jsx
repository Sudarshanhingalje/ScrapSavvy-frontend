import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../styles/DeliveryManagement.css";

import DeliveryCard from "../components/DeliveryCard";
import DeliveryFilters from "../components/DeliveryFilters";
import DeliveryHeader from "../components/DeliveryHeader";
import TrackingSearchBar from "../components/TrackingSearchBar";

import { fetchDeliveries } from "../redux/deliveryThunk";

import useDeliveryFilters from "../hooks/useDeliveryFilters";
import useTrackingSearch from "../hooks/useTrackingSearch";

import ScrapyardSidebar from "../../../../../../shared/layout/ScrapyardSidebar";

const DeliveryManagementPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    deliveries = [],
    loading,
    error,
  } = useSelector((state) => state.delivery);

  const [selectedFilter, setSelectedFilter] = useState("ALL");

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, [dispatch]);

  // FILTER

  const filteredDeliveries = useDeliveryFilters(deliveries, selectedFilter);

  // SEARCH

  const searchedDeliveries = useTrackingSearch(filteredDeliveries, searchTerm);

  // VIEW DETAILS

  const handleViewDetails = (id) => {
    navigate(`/scrapyard/delivery/${id}`);
  };

  return (
    <div className="delivery-layout">
      {/* SIDEBAR */}

      <ScrapyardSidebar />

      {/* MAIN CONTENT */}

      <div className="delivery-management-container">
        <h1 className="delivery-management-title">Delivery Management</h1>

        {/* HEADER */}

        <DeliveryHeader deliveries={deliveries} />

        {/* SEARCH */}

        <TrackingSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* FILTERS */}

        <DeliveryFilters
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />

        {/* LOADING */}

        {loading && <div className="delivery-empty">Loading deliveries...</div>}

        {/* ERROR */}

        {error && (
          <div className="delivery-empty">
            {typeof error === "object"
              ? error.message || "Something went wrong"
              : error}
          </div>
        )}

        {/* EMPTY */}

        {!loading && !error && searchedDeliveries?.length === 0 && (
          <div className="delivery-empty">No deliveries found</div>
        )}

        {/* GRID */}

        {!loading && !error && searchedDeliveries?.length > 0 && (
          <div className="delivery-grid">
            {searchedDeliveries.map((delivery) => (
              <DeliveryCard
                key={delivery.orderId}
                delivery={delivery}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryManagementPage;
