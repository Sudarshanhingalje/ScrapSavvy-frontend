import ItemCard from "./ItemCard";

const AvailableItemsSection = ({ products = [] }) => {
  return (
    <div className="cd-section">
      <h2 className="cd-section__title">Available Items</h2>

      <div className="cd-items-grid">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <ItemCard key={product?.productId} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default AvailableItemsSection;
