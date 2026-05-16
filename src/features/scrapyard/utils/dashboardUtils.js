export const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const calculateStats = (orders) => {
  const completedOrders = orders.filter(
    (order) => order.status === "COMPLETED",
  );

  return {
    totalOrders: orders.length,

    totalScrapReceived: orders.reduce(
      (sum, order) => sum + (order.quantity || 0),
      0,
    ),

    totalScrapSold: completedOrders.reduce(
      (sum, order) => sum + (order.quantity || 0),
      0,
    ),

    totalRevenue: completedOrders.reduce(
      (sum, order) => sum + (order.totalPrice || 0),
      0,
    ),
  };
};

export const getCollectionChartData = (transactions) => {
  const monthlyMap = {};

  transactions
    .filter((tx) => tx.type === "ADD")
    .forEach((tx) => {
      if (!tx.createdAt) return;

      const month = MONTH_NAMES[new Date(tx.createdAt).getMonth()];

      monthlyMap[month] = (monthlyMap[month] || 0) + (tx.quantity || 0);
    });

  return {
    labels: Object.keys(monthlyMap),
    values: Object.values(monthlyMap),
  };
};

export const getRevenueChartData = (transactions) => {
  const revenueMap = {};

  transactions
    .filter((tx) => tx.type === "REMOVE")
    .forEach((tx) => {
      if (!tx.createdAt) return;

      const month = MONTH_NAMES[new Date(tx.createdAt).getMonth()];

      revenueMap[month] =
        (revenueMap[month] || 0) + (tx.quantity || 0) * (tx.pricePerKg || 0);
    });

  return {
    labels: Object.keys(revenueMap),
    values: Object.values(revenueMap),
  };
};

export const getScrapDistributionData = (inventory) => {
  const scrapMap = {};

  inventory.forEach((item) => {
    const type = item.materialType || "Others";

    scrapMap[type] = (scrapMap[type] || 0) + (item.quantity || 0);
  });

  return {
    labels: Object.keys(scrapMap),
    values: Object.values(scrapMap),
  };
};
