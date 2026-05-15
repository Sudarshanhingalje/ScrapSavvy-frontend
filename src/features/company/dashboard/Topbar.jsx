import LogoutMenu from "../../../shared/components/LogoutMenu";

const Topbar = () => {
  const companyName = Number(localStorage.getItem("name")) || 101;

  return (
    <div className="cd-top">
      <div className="cd-top__left">
        <h1>🏢 Dashboard — Company</h1>
        <p>Enterprise scrap procurement & sustainability hub</p>
      </div>

      <div className="cd-top__right">
        <span className="cd-company-pill">🏭 Company Name : {companyName}</span>

        <button className="cd-notif">
          🔔
          <span className="cd-notif-dot" />
        </button>

        <LogoutMenu />
      </div>
    </div>
  );
};

export default Topbar;
