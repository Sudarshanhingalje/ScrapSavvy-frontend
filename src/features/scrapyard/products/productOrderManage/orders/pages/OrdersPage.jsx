import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import useOrders from "../hooks/useOrders";

import ScrapyardSidebar from "../../../../../../shared/layout/ScrapyardSidebar";

import EmptyOrders from "../components/EmptyOrders";
import LoadingOrders from "../components/LoadingOrders";
import OrderFilters from "../components/OrderFilters";
import OrderRow from "../components/OrderRow";
import OrderStatsBar from "../components/OrderStatsBar";

import "../styles/orders.css";

const ORDERS_PER_PAGE = 25;

// Orders that are done — safe to clear from view
const CLEARABLE_STATUSES = ["DELIVERED", "COMPLETED", "CANCELLED", "REJECTED"];

const CLEARED_KEY = "scrapyard_cleared_order_ids";

const getClearedIds = () => {
  try {
    return JSON.parse(localStorage.getItem(CLEARED_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveClearedIds = (ids) => {
  localStorage.setItem(CLEARED_KEY, JSON.stringify(ids));
};

const OrdersPage = () => {
  const navigate = useNavigate();

  const { orders, loading, error, fetchOrders, updateStatus } = useOrders();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [clearedIds, setClearedIds] = useState(() => getClearedIds());
  const [showCleared, setShowCleared] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, typeFilter, sortBy, showCleared]);

  // Clear single order from view (stays in DB)
  const handleClearOrder = (orderId) => {
    const order = orders.find((o) => o.orderId === orderId);
    if (!order || !CLEARABLE_STATUSES.includes(order.orderStatus)) {
      alert(
        "Only DELIVERED / COMPLETED / CANCELLED / REJECTED orders can be cleared.",
      );
      return;
    }
    const updated = [...new Set([...clearedIds, orderId])];
    setClearedIds(updated);
    saveClearedIds(updated);
    setSelectedIds((prev) => prev.filter((id) => id !== orderId));
  };

  // Bulk clear selected clearable orders
  const handleBulkClear = () => {
    const clearable = selectedIds.filter((id) => {
      const order = orders.find((o) => o.orderId === id);
      return order && CLEARABLE_STATUSES.includes(order.orderStatus);
    });
    if (!clearable.length) {
      alert(
        "Select at least one DELIVERED / COMPLETED / CANCELLED / REJECTED order to clear.",
      );
      return;
    }
    const updated = [...new Set([...clearedIds, ...clearable])];
    setClearedIds(updated);
    saveClearedIds(updated);
    setSelectedIds([]);
  };

  // Restore all cleared orders back to view
  const handleRestoreAll = () => {
    setClearedIds([]);
    saveClearedIds([]);
    setShowCleared(false);
  };

  const filteredOrders = useMemo(() => {
    let result = [...(orders ?? [])];

    // Hide cleared unless showCleared is on
    if (!showCleared) {
      result = result.filter((o) => !clearedIds.includes(o.orderId));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.buyerName?.toLowerCase().includes(q) ||
          String(o.orderId).includes(q),
      );
    }

    if (statusFilter !== "ALL") {
      result = result.filter((o) => o.orderStatus === statusFilter);
    }

    if (typeFilter !== "ALL") {
      result = result.filter((o) => o.buyerType === typeFilter);
    }

    if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "amount_desc") {
      result.sort((a, b) => b.totalAmount - a.totalAmount);
    } else if (sortBy === "amount_asc") {
      result.sort((a, b) => a.totalAmount - b.totalAmount);
    } else {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [
    orders,
    searchQuery,
    statusFilter,
    typeFilter,
    sortBy,
    showCleared,
    clearedIds,
  ]);

  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ORDERS_PER_PAGE;
    return filteredOrders.slice(start, start + ORDERS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  const handleViewOrder = (orderId) => navigate(`/scrapyard/orders/${orderId}`);

  const handleSelect = (orderId) => {
    setSelectedIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId],
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedOrders.map((o) => o.orderId));
    } else {
      setSelectedIds([]);
    }
  };

  const handleBulkStatus = (status) => {
    selectedIds.forEach((id) => updateStatus(id, status));
    setSelectedIds([]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedIds([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const allOnPageSelected =
    paginatedOrders.length > 0 &&
    paginatedOrders.every((o) => selectedIds.includes(o.orderId));

  const clearedCount = clearedIds.length;

  return (
    <div className="orders-layout">
      {/* SIDEBAR — unchanged, stays fixed on left */}
      <ScrapyardSidebar />

      {/* RIGHT CONTENT — flex column, fills remaining width */}
      <div className="orders-content">
        {/* STICKY TOP ZONE — header + stats + filters never scroll */}
        <div className="orders-sticky-top">
          {/* HEADER */}
          <div className="orders-header">
            <div>
              <h1>Incoming Orders</h1>
              <p>Manage customer and company orders</p>
            </div>

            {/* Cleared orders toggle */}
            <div className="orders-header-actions">
              {clearedCount > 0 && (
                <button
                  className="btn-show-cleared"
                  onClick={() => setShowCleared((v) => !v)}
                >
                  {showCleared
                    ? "Hide Cleared Orders"
                    : `Show Cleared (${clearedCount})`}
                </button>
              )}
              {showCleared && clearedCount > 0 && (
                <button className="btn-restore-all" onClick={handleRestoreAll}>
                  ↩ Restore All
                </button>
              )}
            </div>
          </div>

          <OrderStatsBar orders={orders} />

          <OrderFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* BULK BAR */}
          {selectedIds.length > 0 && (
            <div className="bulk-bar">
              <span>{selectedIds.length} selected</span>
              <button onClick={() => handleBulkStatus("ACCEPTED")}>
                Accept
              </button>
              <button
                onClick={() => handleBulkStatus("REJECTED")}
                className="bulk-danger"
              >
                Reject
              </button>
              <button onClick={() => handleBulkStatus("DELIVERED")}>
                Mark Delivered
              </button>
              <button onClick={handleBulkClear} className="bulk-clear-btn">
                🗑 Clear from View
              </button>
              <button onClick={() => setSelectedIds([])} className="bulk-clear">
                ✕ Deselect
              </button>
            </div>
          )}
        </div>

        {/* SCROLLABLE TABLE ZONE */}
        <div className="orders-scroll-area">
          {loading ? (
            <LoadingOrders />
          ) : error ? (
            <div className="orders-error">
              {typeof error === "string"
                ? error
                : error?.message || "Something went wrong"}
            </div>
          ) : !filteredOrders.length ? (
            <EmptyOrders />
          ) : (
            <div className="table-wrap">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={allOnPageSelected}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>Order ID</th>
                    <th>Buyer</th>
                    <th>Type</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Ordered on</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((order) => (
                    <OrderRow
                      key={order.orderId}
                      order={order}
                      isSelected={selectedIds.includes(order.orderId)}
                      isCleared={clearedIds.includes(order.orderId)}
                      onSelect={handleSelect}
                      onView={handleViewOrder}
                      onClear={handleClearOrder}
                      clearable={CLEARABLE_STATUSES.includes(order.orderStatus)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* PAGINATION — pinned to bottom of content area */}
        {!loading && !error && filteredOrders.length > 0 && (
          <div className="pagination">
            <span className="pagination-info">
              Showing{" "}
              {Math.min(
                (currentPage - 1) * ORDERS_PER_PAGE + 1,
                filteredOrders.length,
              )}
              –{Math.min(currentPage * ORDERS_PER_PAGE, filteredOrders.length)}{" "}
              of {filteredOrders.length} orders
              {clearedCount > 0 && !showCleared && (
                <span className="cleared-note">
                  &nbsp;· {clearedCount} cleared (hidden)
                </span>
              )}
            </span>

            <div className="pagination-btns">
              <button
                className="page-btn"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                ‹ Prev
              </button>

              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span key={`dots-${idx}`} className="page-dots">
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    className={`page-btn ${currentPage === page ? "active" : ""}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                className="page-btn"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
