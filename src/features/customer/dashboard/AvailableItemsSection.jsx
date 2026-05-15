import ItemCard from "./ItemCard";

const AvailableItemsSection = ({ items = [] }) => {
  return (
    <div className="cd-section">
      <h2 className="cd-section__title">Available Items</h2>

      <div className="cd-items-grid">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AvailableItemsSection;
