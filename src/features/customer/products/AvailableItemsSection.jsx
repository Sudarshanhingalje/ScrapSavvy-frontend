import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { PRICE_KEYS } from "../constants/priceKeys";
import ItemCard from "../products/ItemCard";

const AvailableItemsSection = ({ products = [] }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const { data: prices = {} } = useSelector((state) => state.scrapRates);

  const filtered = useMemo(() => {
    let list = products.filter(Boolean);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        (p?.productName || "").toLowerCase().includes(q),
      );
    }

    if (sort === "price-asc") {
      list = [...list].sort((a, b) => (a?.price ?? 0) - (b?.price ?? 0));
    }
    if (sort === "price-desc") {
      list = [...list].sort((a, b) => (b?.price ?? 0) - (a?.price ?? 0));
    }

    return list;
  }, [products, search, sort]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* ── Live Rates Marquee ── */}
      <div className="rates-bar">
        <span className="rates-label">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          Live rates
        </span>
        <div className="rates-scroll-wrap">
          <div className="rates-inner">
            {/* duplicated for seamless infinite scroll */}
            {[...PRICE_KEYS, ...PRICE_KEYS].map(({ icon, label, key }, i) => {
              const rate = prices?.[key]?.customerPrice;
              return (
                <span key={i} className="rate-item">
                  <span className="rate-name">
                    {icon} {label}
                  </span>
                  <span className="rate-sep">|</span>
                  {rate ? `₹${rate}/kg` : "--"}
                </span>
              );
            })}{" "}
            {[...PRICE_KEYS, ...PRICE_KEYS].map(({ icon, label, key }, i) => {
              const rate = prices?.[key]?.customerPrice;
              return (
                <span key={i} className="rate-item">
                  <span className="rate-name">
                    {icon} {label}
                  </span>
                  <span className="rate-sep">|</span>
                  {rate ? `₹${rate}/kg` : "--"}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Section Card ── */}
      <div className="cpp-section">
        <div className="cpp-section__header">
          <h2 className="cpp-section__title">Products available</h2>
          {filtered.length > 0 && (
            <span className="cpp-badge">{filtered.length} items</span>
          )}
        </div>
        <p className="cpp-section__subtitle">
          Browse available scrap products from the yard
        </p>

        {/* ── Search + Sort ── */}
        <div className="ps-controls-row">
          <div className="ps-search-wrap">
            <svg
              width="8"
              height="8"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="ps-search-input"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
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

        {/* ── Product Grid ── */}
        {products.length === 0 ? (
          <p className="cpp-empty">No products available right now.</p>
        ) : filtered.length === 0 ? (
          <p className="cpp-empty">No products match your search.</p>
        ) : (
          <div className="ps-grid">
            {filtered.map((product) => (
              <ItemCard key={product?._id || product?.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableItemsSection;
