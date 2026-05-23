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
import RecentTransactions from "../features/scrapyard/dashboard/ScrapyardTransactions";
import Customerorders from "../features/scrapyard/orders/CustomerOrders";
import ScrapOrders from "../features/scrapyard/orders/ScrapOrders";
import AllProducts from "../features/scrapyard/pages/AllProducts";
import ProductsPage from "../features/scrapyard/pages/ProductsPage";
import ScrapyardDashboard from "../features/scrapyard/pages/ScrapyardDashboard";
import ScrapyardProfile from "../features/scrapyard/pages/ScrapyardProfile";
import OrderDetailsPage from "../features/scrapyard/products/productOrderManage/orders/pages/OrderDetailsPage";
import OrdersPage from "../features/scrapyard/products/productOrderManage/orders/pages/OrdersPage";
import ProtectedRoute from "../routes/ProtectedRoute";

import AssignDriverPage from "../features/scrapyard/products/productOrderManage/delivery/pages/AssignDriverPage";
import DeliveredPage from "../features/scrapyard/products/productOrderManage/delivery/pages/DeliveredPage";
import DeliveryDetailsPage from "../features/scrapyard/products/productOrderManage/delivery/pages/DeliveryDetailsPage";
import DeliveryManagementPage from "../features/scrapyard/products/productOrderManage/delivery/pages/DeliveryManagementPage";
import FailedDeliveriesPage from "../features/scrapyard/products/productOrderManage/delivery/pages/FailedDeliveriesPage";
import InTransitPage from "../features/scrapyard/products/productOrderManage/delivery/pages/InTransitPage";
import OutForDeliveryPage from "../features/scrapyard/products/productOrderManage/delivery/pages/OutForDeliveryPage";
import PickupPendingPage from "../features/scrapyard/products/productOrderManage/delivery/pages/PickupPendingPage";
import TrackingPage from "../features/scrapyard/products/productOrderManage/delivery/pages/TrackingPage";
import TrackingSearchPage from "../features/scrapyard/products/productOrderManage/delivery/pages/TrackingSearchPage";
import ReviewsPage from "../features/scrapyard/products/productOrderManage/review/ReviewsPage";
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
        <Route path="/scraporders" element={<ScrapOrders />} />
        <Route path="/customerorders" element={<Customerorders />} />

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

        <Route path="/scrapyardprofile" element={<ScrapyardProfile />} />

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

        <Route path="/scrapyard/orders" element={<OrdersPage />} />

        <Route
          path="/scrapyard/orders/:orderId"
          element={<OrderDetailsPage />}
        />
        <Route
          path="/scrapyard/delivery/:id"
          element={<DeliveryDetailsPage />}
        />

        {/* DELIVERY MANAGEMENT */}
        <Route
          path="/scrapyard/delivery"
          element={<DeliveryManagementPage />}
        />
        <Route
          path="/scrapyard/delivery/out-for-delivery"
          element={<OutForDeliveryPage />}
        />
        <Route
          path="/scrapyard/delivery/in-transit"
          element={<InTransitPage />}
        />
        <Route
          path="/scrapyard/delivery/delivered"
          element={<DeliveredPage />}
        />
        <Route
          path="/scrapyard/delivery/failed"
          element={<FailedDeliveriesPage />}
        />
        <Route
          path="/scrapyard/delivery/pickup-pending"
          element={<PickupPendingPage />}
        />

        <Route
          path="/scrapyard/delivery/:id"
          element={<DeliveryDetailsPage />}
        />

        <Route
          path="/scrapyard/assign-driver/:id"
          element={<AssignDriverPage />}
        />

        <Route path="/tracking/:trackingId" element={<TrackingPage />} />

        <Route path="/tracking-search" element={<TrackingSearchPage />} />
        <Route path="/scrapyard/reviews" element={<ReviewsPage />} />

        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>

      {/* GLOBAL CART DRAWER */}
      <CartDrawer />
    </>
  );
}

export default AppRoutes;
