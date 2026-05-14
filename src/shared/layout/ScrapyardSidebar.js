import {
  faCreditCard,
  faHome,
  faShoppingCart,
  faTachometerAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../Static/Sidebar.css";
import { BRANDNAME } from "../utils/Utils";

const ScrapyardSidebar = () => {
  const [isOffcanvasOpen, setOffcanvasOpen] = useState(false);
  const location = useLocation();

  const toggleOffcanvas = () => setOffcanvasOpen((prev) => !prev);
  const closeOffcanvas = () => setOffcanvasOpen(false);

  const isActive = (path) => location.pathname === path;
  const linkClass = (path) =>
    `list-group-item list-group-item-action${isActive(path) ? " active" : ""}`;

  const navItems = [
    { to: "/scrapyard-dashboard", icon: faTachometerAlt, label: "Dashboard" },
    { to: "/scrap-orders", icon: faShoppingCart, label: "Company Orders" },
    { to: "/customer-orders", icon: faShoppingCart, label: "Customer Orders" },
    {
      to: "/scrapyard-transactions",
      icon: faCreditCard,
      label: "Transactions",
    },
    { to: "/scrapyard-profile", icon: faUser, label: "Profile" },
  ];

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <div id="sidebar-wrapper">
        <div className="sidebar-heading">{BRANDNAME}</div>

        <div className="sidebar-section-label">Main Menu</div>

        <div className="list-group list-group-flush">
          {navItems.map(({ to, icon, label }) => (
            <Link key={to} to={to} className={linkClass(to)}>
              <FontAwesomeIcon icon={icon} className="icon" />
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Mobile Toggle Button ── */}
      <button
        className="sb-mobile-toggle"
        onClick={toggleOffcanvas}
        aria-label="Open menu"
      >
        <FontAwesomeIcon icon={faHome} />
      </button>

      {/* ── Mobile Offcanvas Drawer ── */}
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

      <div
        className={`offcanvas offcanvas-start${isOffcanvasOpen ? " show" : ""}`}
        style={{
          visibility: isOffcanvasOpen ? "visible" : "hidden",
          zIndex: 1050,
          transition: "transform 0.25s ease",
          transform: isOffcanvasOpen ? "translateX(0)" : "translateX(-100%)",
        }}
        aria-label="Navigation"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">{BRANDNAME}</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={closeOffcanvas}
          />
        </div>
        <div className="offcanvas-body">
          <div className="list-group list-group-flush">
            {navItems.map(({ to, icon, label }) => (
              <Link
                key={to}
                to={to}
                className={linkClass(to)}
                onClick={closeOffcanvas}
              >
                <FontAwesomeIcon icon={icon} className="icon" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrapyardSidebar;
