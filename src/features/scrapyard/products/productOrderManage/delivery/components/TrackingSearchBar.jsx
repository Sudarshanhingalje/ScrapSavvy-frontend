import "../styles/TrackingSearchBar.css";

const TrackingSearchBar = ({ searchTerm, setSearchTerm, placeholder }) => {
  return (
    <div className="tracking-search-bar">
      <input
        type="text"
        className="tracking-search-input"
        placeholder={placeholder || "Search by Tracking ID, Order ID..."}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default TrackingSearchBar;
