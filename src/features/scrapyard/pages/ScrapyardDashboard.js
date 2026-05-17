import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LogoutMenu from "../../../shared/components/LogoutMenu";
import ScrapyardSidebar from "../../../shared/layout/ScrapyardSidebar";

import CollectionChart from "../dashboard/CollectionChart";
import DashboardStats from "../dashboard/DashboardStats";
import InventorySummary from "../dashboard/InventorySummary";
import PriceCards from "../dashboard/PriceCards";
import RevenueChart from "../dashboard/RevenueChart";
import ScrapDistribution from "../dashboard/ScrapDistribution";
import UpdatePriceForm from "../dashboard/UpdatePriceForm";

import {
  fetchInventory,
  fetchOrders,
  fetchTransactions,
} from "../redux/scrapyardSlice";

import { getScrapRates } from "../../scrapRates/redux/scrapRatesThunk";

import {
  calculateStats,
  getCollectionChartData,
  getRevenueChartData,
  getScrapDistributionData,
} from "../utils/dashboardUtils";

import useDashboardSocket from "../hooks/useDashboardSocket";

import "../styles/ScrapyardDashboard.css";

const ScrapyardDashboard = () => {
  const dispatch = useDispatch();

  // ✅ ORDERS / INVENTORY / TRANSACTIONS
  const { orders, inventory, transactions } = useSelector(
    (state) => state.scrapyard,
  );

  // ✅ PRICES FROM SCRAPRATES (IMPORTANT FIX)
  const prices = useSelector((state) => state.scrapRates.data);

  const ownerId = localStorage.getItem("userId");

  // SOCKET
  useDashboardSocket();

  // INITIAL LOAD
  useEffect(() => {
    dispatch(getScrapRates(ownerId)); // ✅ correct source

    dispatch(fetchOrders());
    dispatch(fetchInventory());
    dispatch(fetchTransactions());
  }, [dispatch, ownerId]);

  // refresh after price update
  const refresh = () => {
    dispatch(getScrapRates(ownerId));
  };

  const stats = calculateStats(orders);
  const collectionChartData = getCollectionChartData(transactions);
  const revenueChartData = getRevenueChartData(transactions);
  const scrapDistributionData = getScrapDistributionData(inventory);

  return (
    <div className="sd-layout">
      <ScrapyardSidebar />

      <div className="sd-main">
        <div className="sd-topbar">
          <div>
            <p className="sd-subtitle">ScrapSavvy · Owner Panel</p>
            <h1 className="sd-title">Scrapyard Dashboard</h1>
            <p className="sd-subtitle">
              Real-time overview of your scrapyard operations
            </p>
          </div>

          <LogoutMenu />
        </div>

        <div className="sd-content">
          <DashboardStats stats={stats} />

          <PriceCards prices={prices} />

          <div className="sd-grid-2">
            <CollectionChart data={collectionChartData} />
            <ScrapDistribution data={scrapDistributionData} />
          </div>

          <UpdatePriceForm onSuccess={refresh} />

          <div className="sd-grid-bottom">
            <RevenueChart data={revenueChartData} />
            <InventorySummary inventory={inventory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapyardDashboard;
