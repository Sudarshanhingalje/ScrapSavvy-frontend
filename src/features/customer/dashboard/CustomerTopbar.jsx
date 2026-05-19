import LogoutMenu from "../../../shared/components/LogoutMenu";

import CartBadge from "../../customer/cart/pages/CartBadge";
import CartDrawer from "../../customer/cart/pages/CartDrawer";

const CustomerTopbar = () => {
  return (
    <>
      <div className="cd-topbar">
        <div>
          <h1 className="cd-topbar__title">Welcome Back 👋</h1>

          <p className="cd-topbar__subtitle">
            Track scrap rates, orders and marketplace activity
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <CartBadge />

          <LogoutMenu />
        </div>
      </div>

      <CartDrawer />
    </>
  );
};

export default CustomerTopbar;
