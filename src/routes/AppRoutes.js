import { Navigate, Route, Routes } from "react-router-dom";

import ForgotPassword from "../features/auth/pages/ForgotPassword";
import Signin from "../features/auth/pages/Signin";
import Signup from "../features/auth/pages/Signup";

import CompPaymentsReceivedTable from "../features/company/analytics/CompPaymentsReceivedTable";
import CompScrapsTable from "../features/company/analytics/CompScrapsTable";
import CompanyDashboard from "../features/company/pages/CompanyDashboard";
import CompanyProfile from "../features/company/pages/CompanyProfile";
import ScrapOrder from "../features/company/pages/ScrapOrder";

import CScrapsTable from "../features/customer/components/CScrapsTable";
import CustomerTransactions from "../features/customer/dashboard/CustomerTransactions";
import CustomerOrdersHistory from "../features/customer/orders/CustomerOrdersHistory";
import CustomerSells from "../features/customer/orders/CustomerSells";
import CustomerDashboard from "../features/customer/pages/CustomerDashboard";
import CustomerProfile from "../features/customer/pages/CustomerProfile";

import MySScrapsTable from "../features/scrapyard/components/MySScrapsTable";
import SScrapsTable from "../features/scrapyard/components/SScrapsTable";
import RecentTransactions from "../features/scrapyard/dashboard/ScrapyardTransactions";
import Customerorders from "../features/scrapyard/orders/CustomerOrders";
import ScrapOrders from "../features/scrapyard/orders/ScrapOrders";
import ScrapyardDashboard from "../features/scrapyard/pages/ScrapyardDashboard";
import ScrapyardProfile from "../features/scrapyard/pages/ScrapyardProfile";

import OrdersHistory from "../features/company/pages/OrdersHistory";
import Frontpage from "../features/home/pages/Frontpage";
import PaymentsMadeTable from "../features/payment/PaymentsMadeTable";
import PaymentsReceivedTable from "../features/payment/PaymentsReceivedTable";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Frontpage />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />

      {/* Company */}
      <Route path="/company-dashboard" element={<CompanyDashboard />} />
      <Route path="/company-dashboard/scrap-order" element={<ScrapOrder />} />
      <Route
        path="/company-dashboard/orders-history"
        element={<OrdersHistory />}
      />
      <Route path="/com-list-of-scraps" element={<CompScrapsTable />} />
      <Route path="/company-payments" element={<CompPaymentsReceivedTable />} />
      <Route path="/company-profile" element={<CompanyProfile />} />

      {/* Scrapyard */}
      <Route path="/scrapyard-dashboard" element={<ScrapyardDashboard />} />
      <Route path="/scrap-orders" element={<ScrapOrders />} />
      <Route path="/customer-orders" element={<Customerorders />} />
      <Route path="/sr-list-of-scraps" element={<SScrapsTable />} />
      <Route path="/mysr-list-of-scraps" element={<MySScrapsTable />} />
      <Route path="/scrapyard-transactions" element={<RecentTransactions />} />
      <Route path="/scrapyard-profile" element={<ScrapyardProfile />} />

      {/* Customer */}
      <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      <Route
        path="/customer-dashboard/scrap-sell"
        element={<CustomerSells />}
      />
      <Route
        path="/customer-dashboard/customer-orders-history"
        element={<CustomerOrdersHistory />}
      />
      <Route path="/cus-list-of-scraps" element={<CScrapsTable />} />
      <Route path="/customer-transactions" element={<CustomerTransactions />} />
      <Route path="/customer-profile" element={<CustomerProfile />} />

      {/* Payments */}
      <Route path="/r-payments" element={<PaymentsReceivedTable />} />
      <Route path="/m-payments" element={<PaymentsMadeTable />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
