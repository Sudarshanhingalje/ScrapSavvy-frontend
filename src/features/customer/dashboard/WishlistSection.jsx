import WishlistItem from "./WishlistItem";

const WishlistSection = ({ wishlist = [], removeFromWishlist = () => {} }) => {
  return (
    <div className="cd-section">
      <h2 className="cd-section__title">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="cd-empty-text">Your wishlist is empty.</p>
      ) : (
        <div className="cd-wishlist-list">
          {wishlist.map((item) => (
            <WishlistItem
              key={item.id}
              item={item}
              removeFromWishlist={removeFromWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistSection;
