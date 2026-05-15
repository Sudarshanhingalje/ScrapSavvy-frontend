import LogoutMenu from "../../../shared/components/LogoutMenu";

const CustomerTopbar = () => {
  return (
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
        <div className="cd-live-pill">● Live Market</div>

        <LogoutMenu />
      </div>
    </div>
  );
};

export default CustomerTopbar;
