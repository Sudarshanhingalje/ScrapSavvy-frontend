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

  const filteredDeliveries = useDeliveryFilters(deliveries, selectedFilter);
  const searchedDeliveries = useTrackingSearch(filteredDeliveries, searchTerm);

  const handleViewDetails = (id) => {
    navigate(`/scrapyard/delivery/${id}`);
  };

  return (
    <div className="delivery-layout">
      <ScrapyardSidebar />

      <div className="delivery-management-container">
        <h1 className="delivery-management-title">📦 Delivery Management</h1>

        {/* STATS */}
        <DeliveryHeader deliveries={deliveries} />

        {/* SEARCH */}
        <TrackingSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search by Tracking ID, Order ID or Customer Name..."
        />

        {/* FILTERS */}
        <DeliveryFilters
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />

        {/* LOADING */}
        {loading && (
          <div className="delivery-empty">
            <div className="delivery-empty-icon">⏳</div>
            <div>Loading deliveries...</div>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="delivery-empty" style={{ color: "#dc2626" }}>
            <div className="delivery-empty-icon">❌</div>
            <div>
              {typeof error === "object"
                ? error.message || "Something went wrong"
                : error}
            </div>
            <button
              onClick={() => dispatch(fetchDeliveries())}
              style={{
                marginTop: "12px",
                padding: "10px 20px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && searchedDeliveries?.length === 0 && (
          <div className="delivery-empty">
            <div className="delivery-empty-icon">📭</div>
            <div>No deliveries found</div>
            {searchTerm && (
              <div style={{ fontSize: "13px", marginTop: "6px" }}>
                Try a different search term
              </div>
            )}
          </div>
        )}

        {/* DELIVERY GRID */}
        {!loading && !error && searchedDeliveries?.length > 0 && (
          <>
            <div
              style={{
                fontSize: "13px",
                color: "#64748b",
                marginBottom: "12px",
                fontWeight: "500",
              }}
            >
              Showing {searchedDeliveries.length} of {deliveries.length}{" "}
              deliveries
            </div>

            <div className="delivery-grid">
              {searchedDeliveries.map((delivery) => (
                <DeliveryCard
                  key={delivery.orderId}
                  delivery={delivery}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeliveryManagementPage;
