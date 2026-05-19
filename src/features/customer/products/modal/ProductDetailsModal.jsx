import { useMemo, useState } from "react";

import "./ProductDetailsModal.css";
import ProductModalActions from "./ProductModalActions";
import ProductModalGallery from "./ProductModalGallery";
import ProductModalInfo from "./ProductModalInfo";

const ProductDetailsModal = ({ product, onClose }) => {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const specifications = useMemo(() => {
    try {
      if (!product?.specifications) return [];
      if (Array.isArray(product.specifications)) return product.specifications;
      return JSON.parse(product.specifications);
    } catch {
      return [];
    }
  }, [product]);

  if (!product) return null;

  const images = Array.isArray(product?.images) ? product.images : [];
  const inStock = (product?.quantity ?? 0) > 0;
  const discountPercent =
    product?.mrp && product?.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <div className="pdm-overlay" onClick={onClose}>
      <div className="pdm-modal" onClick={(e) => e.stopPropagation()}>
        {/* ═══ CLOSE BUTTON ═══ */}
        <button className="pdm-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="pdm-container">
          {/* ══════════════════════════════
              LEFT — image + thumbnails + spec table
          ══════════════════════════════ */}
          <ProductModalGallery
            product={product}
            images={images}
            activeImg={activeImg}
            setActiveImg={setActiveImg}
            discountPercent={discountPercent}
          />

          {/* ══════════════════════════════
              RIGHT — scrollable details + sticky buy bar
          ══════════════════════════════ */}
          <div className="pdm-right">
            {/* scrollable content */}
            <ProductModalInfo
              product={product}
              specifications={specifications}
              inStock={inStock}
              discountPercent={discountPercent}
            />

            {/* ── sticky buy bar pinned to bottom ── */}
            <ProductModalActions
              product={product}
              qty={qty}
              setQty={setQty}
              inStock={inStock}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
