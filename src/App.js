import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "../src/Static/Style.css";

// your imports...
import ForgotPassword from "./Components/Auth/ForgotPassword";
import Signin from "./Components/Auth/Signin";
import Signup from "./Components/Auth/Signup";
import SplashScreen from "./Components/Common/SplashScreen";
import CompanyDashboard from "./Components/Company/CompanyDashboard";
import CompanyProfile from "./Components/Company/CompanyProfile";
import CompPaymentsReceivedTable from "./Components/Company/CompPaymentsReceivedTable";
import CompScrapsTable from "./Components/Company/CompScrapsTable";
import Ordershistory from "./Components/Company/Ordershistory";
import ScrapOrder from "./Components/Company/ScrapOrder";
import CScrapsTable from "./Components/Customer/CScrapsTable";
import CustomerDashboard from "./Components/Customer/CustomerDashboard";
import CustomerOrdersHistory from "./Components/Customer/CustomerOrdersHistory";
import CustomerProfile from "./Components/Customer/CustomerProfile";
import CustomerSells from "./Components/Customer/CustomerSells";
import CustomerTransactions from "./Components/Customer/CustomerTransactions";
import PaymentsMadeTable from "./Components/Payment/PaymentsMadeTable";
import PaymentsReceivedTable from "./Components/Payment/PaymentsReceivedTable";
import Customerorders from "./Components/Scrapyard/CustomerOrders";
import MySScrapsTable from "./Components/Scrapyard/MySScrapsTable";
import RecentTransactions from "./Components/Scrapyard/RecentTransactions";
import ScrapOrders from "./Components/Scrapyard/ScrapOrders";
import ScrapyardDashboard from "./Components/Scrapyard/ScrapyardDashboard";
import ScrapyardProfile from "./Components/Scrapyard/ScrapyardProfile";
import SScrapsTable from "./Components/Scrapyard/SScrapsTable";
import Frontpage from "./frontpage";

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
            path="//scrapyard-add-remove-stock"
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
