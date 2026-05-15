import CompanySidebar from "../../../shared/layout/CompanySidebar";
import ActivityFeed from "../../company/analytics/ActivityFeed";
import BidBoard from "../../company/bids/BidBoard";
import ContractManagement from "../../company/contracts/ContractManagement";
import LiveRates from "../../company/dashboard/LiveRates";
import Topbar from "../../company/dashboard/Topbar";

import "../styles/companyDashboard.css";

const CompanyDashboard = () => {
  return (
    <div className="cd-wrap">
      <CompanySidebar />

      <div className="cd-main">
        <Topbar />

        <div className="cd-body">
          <LiveRates />

          <BidBoard />

          <div className="cd-g2">
            <ActivityFeed />
            <ContractManagement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
