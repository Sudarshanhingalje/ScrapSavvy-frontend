const WishlistItem = ({ item, removeFromWishlist }) => {
  return (
    <div className="cd-wishlist-item">
      <div>
        <p className="cd-wishlist-item__name">{item.item}</p>

        <p className="cd-wishlist-item__budget">Max Budget: ₹{item.maxPrice}</p>
      </div>

      <button
        className="cd-btn cd-btn--danger-outline"
        onClick={() => removeFromWishlist(item.id)}
      >
        Remove
      </button>
    </div>
  );
};

export default WishlistItem;
