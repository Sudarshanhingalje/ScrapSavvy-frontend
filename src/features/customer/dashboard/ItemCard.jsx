const ItemCard = ({ item }) => {
  const handleBuyNow = () => {
    alert(`Buying ${item.item}`);
  };

  return (
    <div className="cd-item-card">
      <img src={item.image} alt={item.item} className="cd-item-card__image" />

      <div className="cd-item-card__body">
        <h4 className="cd-item-card__name">{item.item}</h4>

        <div className="cd-item-card__meta">
          <span className="cd-item-card__condition">{item.condition}</span>

          <span className="cd-item-card__seller">{item.seller}</span>
        </div>

        <p className="cd-item-card__stock">In stock: {item.inStock} units</p>

        <div className="cd-item-card__footer">
          <span className="cd-item-card__price">₹{item.price}</span>

          <button className="cd-btn cd-btn--primary" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
