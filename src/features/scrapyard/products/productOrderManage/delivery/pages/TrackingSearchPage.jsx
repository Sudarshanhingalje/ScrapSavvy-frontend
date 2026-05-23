import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearSearchResults } from "../redux/deliverySlice";
import { searchDeliveries } from "../redux/deliveryThunk";
import "../styles/DeliveryCard.css";
import "../styles/TrackingSearchBar.css";

import DeliveryCard from "../components/DeliveryCard";

const TrackingSearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchResults, searchLoading, searchError } = useSelector(
    (state) => state.delivery,
  );

  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setHasSearched(true);
    dispatch(searchDeliveries(query.trim()));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleClear = () => {
    setQuery("");
    setHasSearched(false);
    dispatch(clearSearchResults());
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        {/* BACK */}
        <button
          onClick={() => navigate("/scrapyard/delivery")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "24px",
            padding: "8px 16px",
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            color: "#374151",
            fontWeight: "500",
          }}
        >
          ← Back to Deliveries
        </button>

        {/* TITLE */}
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "6px",
          }}
        >
          🔍 Track Shipment
        </h1>
        <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "28px" }}>
          Search by Tracking ID, Order ID, or Customer Name
        </p>

        {/* SEARCH INPUT */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "24px",
            marginBottom: "24px",
          }}
        >
          <div className="tracking-search-bar">
            <input
              type="text"
              className="tracking-search-input"
              placeholder="e.g. TRK-2026-12, Order #45, Rahul Sharma..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="tracking-search-btn"
              onClick={handleSearch}
              disabled={searchLoading || !query.trim()}
            >
              {searchLoading ? "Searching..." : "Search"}
            </button>
          </div>

          {hasSearched && (
            <button
              onClick={handleClear}
              style={{
                marginTop: "10px",
                background: "none",
                border: "none",
                color: "#64748b",
                fontSize: "13px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Clear Search
            </button>
          )}
        </div>

        {/* ERROR */}
        {searchError && (
          <div
            style={{
              background: "#fee2e2",
              border: "1px solid #fca5a5",
              borderRadius: "10px",
              padding: "14px 16px",
              color: "#dc2626",
              fontSize: "14px",
              marginBottom: "16px",
            }}
          >
            ❌ {searchError}
          </div>
        )}

        {/* RESULTS */}
        {hasSearched && !searchLoading && (
          <>
            <div
              style={{
                fontSize: "13px",
                color: "#64748b",
                fontWeight: "500",
                marginBottom: "14px",
              }}
            >
              {searchResults.length === 0
                ? "No results found"
                : `Found ${searchResults.length} result(s)`}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "16px",
              }}
            >
              {searchResults.map((delivery) => (
                <DeliveryCard
                  key={delivery.orderId}
                  delivery={delivery}
                  onViewDetails={(id) => navigate(`/scrapyard/delivery/${id}`)}
                />
              ))}
            </div>

            {searchResults.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  background: "#fff",
                  borderRadius: "14px",
                  border: "1px dashed #cbd5e1",
                  color: "#94a3b8",
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
                <div style={{ fontSize: "16px", fontWeight: "600" }}>
                  No deliveries found for "{query}"
                </div>
                <div style={{ fontSize: "13px", marginTop: "6px" }}>
                  Try a different tracking ID or order ID
                </div>
              </div>
            )}
          </>
        )}

        {/* INITIAL STATE */}
        {!hasSearched && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "#fff",
              borderRadius: "14px",
              border: "1px dashed #cbd5e1",
              color: "#94a3b8",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔍</div>
            <div
              style={{ fontSize: "16px", fontWeight: "600", color: "#64748b" }}
            >
              Enter a tracking ID or order ID to search
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingSearchPage;
