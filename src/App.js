import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "../src/Static/Style.css";

// your imports...
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import Signin from "./features/auth/pages/Signin";
import Signup from "./features/auth/pages/Signup";
import CompPaymentsReceivedTable from "./features/company/analytics/CompPaymentsReceivedTable";
import CompScrapsTable from "./features/company/analytics/CompScrapsTable";
import Ordershistory from "./features/company/dashboard/Ordershistory";
import ScrapOrder from "./features/company/dashboard/ScrapOrder";
import CompanyDashboard from "./features/company/pages/CompanyDashboard";
import CompanyProfile from "./features/company/pages/CompanyProfile";
import CScrapsTable from "./features/customer/components/CScrapsTable";
import CustomerTransactions from "./features/customer/dashboard/CustomerTransactions";
import CustomerOrdersHistory from "./features/customer/orders/CustomerOrdersHistory";
import CustomerSells from "./features/customer/orders/CustomerSells";
import CustomerDashboard from "./features/customer/pages/CustomerDashboard";
import CustomerProfile from "./features/customer/pages/CustomerProfile";
import MySScrapsTable from "./features/scrapyard/components/MySScrapsTable";
import SScrapsTable from "./features/scrapyard/components/SScrapsTable";
import RecentTransactions from "./features/scrapyard/dashboard/ScrapyardTransactions";
import Customerorders from "./features/scrapyard/orders/CustomerOrders";
import ScrapOrders from "./features/scrapyard/orders/ScrapOrders";
import ScrapyardDashboard from "./features/scrapyard/pages/ScrapyardDashboard";
import ScrapyardProfile from "./features/scrapyard/pages/ScrapyardProfile";
import Frontpage from "./frontpage";
import PaymentsMadeTable from "./payment/PaymentsMadeTable";
import PaymentsReceivedTable from "./payment/PaymentsReceivedTable";
import SplashScreen from "./shared/components/SplashScreen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second loader

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />

          <Route path="/company-dashboard" element={<CompanyDashboard />} />
          <Route
            path="/company-dashboard/scrap-order"
            element={<ScrapOrder />}
          />
          <Route
            path="/company-dashboard/orders-history"
            element={<Ordershistory />}
          />

          <Route path="/com-list-of-scraps" element={<CompScrapsTable />} />
          <Route
            path="/company-payments"
            element={<CompPaymentsReceivedTable />}
          />
          <Route path="/company-profile" element={<CompanyProfile />} />

          <Route path="/scrapyard-dashboard" element={<ScrapyardDashboard />} />
          <Route path="/scrap-orders" element={<ScrapOrders />} />
          <Route path="/customer-orders" element={<Customerorders />} />
          <Route path="/sr-list-of-scraps" element={<SScrapsTable />} />
          <Route path="/mysr-list-of-scraps" element={<MySScrapsTable />} />
          <Route
            path="/scrapyard-transactions"
            element={<RecentTransactions />}
          />
          <Route path="/scrapyard-profile" element={<ScrapyardProfile />} />

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
          <Route
            path="/customer-transactions"
            element={<CustomerTransactions />}
          />
          <Route path="/customer-profile" element={<CustomerProfile />} />

          <Route path="/r-payments" element={<PaymentsReceivedTable />} />
          <Route path="/m-payments" element={<PaymentsMadeTable />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
