import {
  faBoxOpen,
  faClipboardList,
  faCog,
  faHome,
  faShoppingCart,
  faTachometerAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "../../static/Sidebar.css";
import { BRANDNAME } from "../utils/Utils";

const CustomerSidebar = () => {
  const [isOffcanvasOpen, setOffcanvasOpen] = useState(false);

  const location = useLocation();

  const toggleOffcanvas = () => {
    setOffcanvasOpen((prev) => !prev);
  };

  const closeOffcanvas = () => {
    setOffcanvasOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `list-group-item list-group-item-action ${isActive(path) ? "active" : ""}`;

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}

      <div id="sidebar-wrapper">
        <div className="sidebar-heading">{BRANDNAME}</div>

        {/* ================= MAIN MENU ================= */}

        <div className="sidebar-section-label">MAIN MENU</div>

        <div className="list-group list-group-flush">
          <Link
            to="/customer-dashboard"
            className={linkClass("/customer-dashboard")}
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
            Dashboard
          </Link>
        </div>

        {/* ================= SCRAP SELL MENU ================= */}

        <div className="sidebar-section-label">SCRAP SELL MENU</div>

        <div className="list-group list-group-flush">
          <Link
            to="/customer-dashboard/scrap-sell"
            className={linkClass("/customer-dashboard/scrap-sell")}
          >
            <FontAwesomeIcon icon={faClipboardList} className="icon" />
            Sell Scrap
          </Link>

          <Link
            to="/customer-dashboard/cuordershistory"
            className={linkClass("/customer-dashboard/cuordershistory")}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="icon" />
            Order History
          </Link>
        </div>

        {/* ================= PRODUCT MENU ================= */}

        <div className="sidebar-section-label">PRODUCT MENU</div>

        <div className="list-group list-group-flush">
          <Link to="/cuProductorders" className={linkClass("/cuProductorders")}>
            <FontAwesomeIcon icon={faClipboardList} className="icon" />
            My Orders
          </Link>

          <Link
            to="/cus-list-of-scraps"
            className={linkClass("/cus-list-of-scraps")}
          >
            <FontAwesomeIcon icon={faBoxOpen} className="icon" />
            Products
          </Link>
        </div>

        {/* ================= CUSTOMER MENU ================= */}

        <div className="sidebar-section-label">CUSTOMER MENU</div>

        <div className="list-group list-group-flush">
          <Link
            to="/customer-profile"
            className={linkClass("/customer-profile")}
          >
            <FontAwesomeIcon icon={faUser} className="icon" />
            Profile
          </Link>

          <Link
            to="/customer-settings"
            className={linkClass("/customer-settings")}
          >
            <FontAwesomeIcon icon={faCog} className="icon" />
            Settings
          </Link>
        </div>
      </div>

      {/* ================= MOBILE BUTTON ================= */}

      <button
        className="sb-mobile-toggle"
        onClick={toggleOffcanvas}
        aria-label="Open menu"
      >
        <FontAwesomeIcon icon={faHome} />
      </button>

      {/* ================= BACKDROP ================= */}

      {isOffcanvasOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.4)",
            zIndex: 1040,
          }}
          onClick={closeOffcanvas}
        />
      )}

      {/* ================= MOBILE SIDEBAR ================= */}

      <div
        className={`offcanvas offcanvas-start ${isOffcanvasOpen ? "show" : ""}`}
        style={{
          visibility: isOffcanvasOpen ? "visible" : "hidden",
          zIndex: 1050,
          transition: "transform 0.25s ease",
          transform: isOffcanvasOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">{BRANDNAME}</h5>

          <button
            type="button"
            className="btn-close"
            onClick={closeOffcanvas}
          />
        </div>

        <div className="offcanvas-body">
          {/* MAIN MENU */}

          <div className="sidebar-section-label">MAIN MENU</div>

          <div className="list-group list-group-flush">
            <Link
              to="/customer-dashboard"
              className={linkClass("/customer-dashboard")}
              onClick={closeOffcanvas}
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
              Dashboard
            </Link>
          </div>

          {/* SCRAP SELL MENU */}

          <div className="sidebar-section-label">SCRAP SELL MENU</div>

          <div className="list-group list-group-flush ">
            <Link
              to="/customer-dashboard/scrap-sell"
              className={linkClass("/customer-dashboard/scrap-sell")}
              onClick={closeOffcanvas}
            >
              <FontAwesomeIcon icon={faClipboardList} className="icon" />
              Sell Scrap
            </Link>

            <Link
              to="/customer-dashboard/customer-orders-history"
              className={linkClass(
                "/customer-dashboard/customer-orders-history",
              )}
              onClick={closeOffcanvas}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="icon" />
              Order History
            </Link>
          </div>

          {/* PRODUCT MENU */}

          <div className="sidebar-section-label">PRODUCT MENU</div>

          <div className="list-group list-group-flush">
            <Link
              to="/cuProductorders"
              className={linkClass("/cuProductorders")}
              onClick={closeOffcanvas}
            >
              <FontAwesomeIcon icon={faClipboardList} className="icon" />
              My Orders
            </Link>

            <Link
              to="/cus-list-of-scraps"
              className={linkClass("/cus-list-of-scraps")}
              onClick={closeOffcanvas}
            >
              <FontAwesomeIcon icon={faBoxOpen} className="icon" />
              Products
            </Link>
          </div>

          {/* CUSTOMER MENU */}

          <div className="sidebar-section-label">CUSTOMER MENU</div>

          <div className="list-group list-group-flush">
            <Link
              to="/customer-profile"
              className={linkClass("/customer-profile")}
              onClick={closeOffcanvas}
            >
              <FontAwesomeIcon icon={faUser} className="icon" />
              Profile
            </Link>

            <Link
              to="/customer-settings"
              className={linkClass("/customer-settings")}
              onClick={closeOffcanvas}
            >
              <FontAwesomeIcon icon={faCog} className="icon" />
              Settings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerSidebar;
