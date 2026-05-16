const calculateGrandTotal = (items) => {
  return items.reduce((sum, item) => sum + Number(item.total || 0), 0);
};

export default calculateGrandTotal;
