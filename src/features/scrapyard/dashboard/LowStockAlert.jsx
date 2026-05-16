const LowStockAlert = ({ inventory }) => {
  const lowStock = inventory.filter((item) => item.quantity < 30);

  if (lowStock.length === 0) {
    return null;
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
      <h2 className="text-red-700 font-bold text-lg mb-4">
        ⚠️ Low Stock Alert
      </h2>

      <div className="space-y-2">
        {lowStock.map((item) => (
          <div key={item.materialType} className="flex justify-between">
            <span>{item.materialType}</span>

            <span className="font-bold text-red-600">{item.quantity} kg</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockAlert;
