const TrackingSearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search by Tracking ID"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        marginBottom: "20px",
      }}
    />
  );
};

export default TrackingSearchBar;
