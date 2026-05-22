import React from "react";

const BulkActionsBar = ({ selectedIds, onBulkStatus, onClearSelection }) => {
  if (!selectedIds?.length) return null;

  return (
    <div className="bulk-bar">
      <span>
        {selectedIds.length} order{selectedIds.length > 1 ? "s" : ""} selected
      </span>

      <button onClick={() => onBulkStatus("ACCEPTED")}>Mark accepted</button>
      <button onClick={() => onBulkStatus("PACKED")}>Mark packed</button>
      <button onClick={() => onBulkStatus("SHIPPED")}>Mark shipped</button>
      <button className="bulk-danger" onClick={() => onBulkStatus("CANCELLED")}>
        Cancel orders
      </button>

      <button className="bulk-clear" onClick={onClearSelection}>
        Clear selection
      </button>
    </div>
  );
};

export default BulkActionsBar;
