import { useMemo } from "react";

import ItemCard from "../products/ItemCard";

const AvailableItemsSection = ({
  products = [],
  search = "",
  sort = "newest",
  onViewProduct,
}) => {
  const filtered = useMemo(() => {
    let list = Array.isArray(products) ? products.filter(Boolean) : [];

    // SEARCH
    if (search.trim()) {
      const q = search.toLowerCase();

      list = list.filter((p) =>
        (p?.productName || "").toLowerCase().includes(q),
      );
    }

    // SORT
    if (sort === "price-asc") {
      list = [...list].sort((a, b) => (a?.price || 0) - (b?.price || 0));
    }

    if (sort === "price-desc") {
      list = [...list].sort((a, b) => (b?.price || 0) - (a?.price || 0));
    }

    return list;
  }, [products, search, sort]);

  return (
    <div className="ps-grid">
      {filtered.length === 0 ? (
        <p>No products found</p>
      ) : (
        filtered.map((product, index) => (
          <ItemCard
            key={
              product?.productId || product?.product_id || `product-${index}`
            }
            product={product}
            onViewProduct={onViewProduct}
          />
        ))
      )}
    </div>
  );
};

export default AvailableItemsSection;
