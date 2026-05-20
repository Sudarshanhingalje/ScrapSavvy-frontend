import { Route, Routes } from "react-router-dom";

import ForgotPassword from "../features/auth/pages/ForgotPassword";
import Signin from "../features/auth/pages/Signin";
import Signup from "../features/auth/pages/Signup";

import CompPaymentsReceivedTable from "../features/company/analytics/CompPaymentsReceivedTable";
import CompScrapsTable from "../features/company/analytics/CompScrapsTable";
import CompanyDashboard from "../features/company/pages/CompanyDashboard";
import CompanyProfile from "../features/company/pages/CompanyProfile";
import ScrapOrder from "../features/company/pages/ScrapOrder";

import CustomerTransactions from "../features/customer/dashboard/CustomerTransactions";
import CustomerDashboard from "../features/customer/pages/CustomerDashboard";
import CustomerOrdersHistory from "../features/customer/pages/CustomerOrdersHistory";
import CustomerProfile from "../features/customer/pages/CustomerProfile";
import CustomerSells from "../features/customer/pages/CustomerSells";

import OrdersHistory from "../features/company/pages/OrdersHistory";
import CartDrawer from "../features/customer/cart/pages/CartDrawer";
import CheckoutPage from "../features/customer/cart/pages/CheckoutPage";
import MyOrders from "../features/customer/cart/pages/MyOrders";
import PaymentPage from "../features/customer/cart/pages/PaymentPage";
import CustomerProductPage from "../features/customer/pages/CustomerProductPage";
import Frontpage from "../features/home/pages/Frontpage";
import MySScrapsTable from "../features/scrapyard/components/MySScrapsTable";
import SScrapsTable from "../features/scrapyard/components/SScrapsTable";
import RecentTransactions from "../features/scrapyard/dashboard/ScrapyardTransactions";
import Customerorders from "../features/scrapyard/orders/CustomerOrders";
import ScrapOrders from "../features/scrapyard/orders/ScrapOrders";
import AllProducts from "../features/scrapyard/pages/AllProducts";
import ProductsPage from "../features/scrapyard/pages/ProductsPage";
import ScrapyardDashboard from "../features/scrapyard/pages/ScrapyardDashboard";
import ScrapyardProfile from "../features/scrapyard/pages/ScrapyardProfile";
import ProtectedRoute from "../routes/ProtectedRoute";
function AppRoutes() {
  return (
    <>
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
        <Route
          path="/company-payments"
          element={<CompPaymentsReceivedTable />}
        />
        <Route path="/company-profile" element={<CompanyProfile />} />

        {/* Scrapyard */}
        <Route path="/scrapyard-dashboard" element={<ScrapyardDashboard />} />
        <Route path="/scrap-orders" element={<ScrapOrders />} />
        <Route path="/customer-orders" element={<Customerorders />} />
        <Route path="/sr-list-of-scraps" element={<SScrapsTable />} />
        <Route path="/mysr-list-of-scraps" element={<MySScrapsTable />} />
        <Route
          path="/scrapyard-transactions"
          element={<RecentTransactions />}
        />

        <Route path="/scrapyard-products/add" element={<ProductsPage />} />
        <Route
          path="/scrapyard-products/allproducts"
          element={<AllProducts />}
        />
        {/* <Route
          path="/scrapyard-dashboard/products-orders"
          element={<ProductOrdersManage />}
        /> */}

        <Route path="/scrapyard-profile" element={<ScrapyardProfile />} />

        {/* Customer */}
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route
          path="/customer-dashboard/scrap-sell"
          element={<CustomerSells />}
        />
        <Route
          path="/customer-dashboard/cuordershistory"
          element={<CustomerOrdersHistory />}
        />

        <Route path="/cuProductorders" element={<MyOrders />} />
        <Route path="/cus-list-of-scraps" element={<CustomerProductPage />} />
        <Route
          path="/customer-transactions"
          element={<CustomerTransactions />}
        />
        <Route path="/customer-profile" element={<CustomerProfile />} />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cuProductorders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>

      {/* GLOBAL CART DRAWER */}
      <CartDrawer />
    </>
  );
}

export default AppRoutes;
