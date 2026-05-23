import {
  faBox,
  faClipboardList,
  faCog,
  faCreditCard,
  faHome,
  faPlusCircle,
  faShoppingCart,
  faSignOutAlt,
  faStar,
  faTachometerAlt,
  faTruck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../static/Sidebar.css";
import { BRANDNAME } from "../utils/Utils";

const ScrapyardSidebar = () => {
  const [isOffcanvasOpen, setOffcanvasOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `list-group-item list-group-item-action ${isActive(path) ? "active" : ""}`;

  const navSections = [
    {
      section: "DASHBOARD",
      items: [
        {
          to: "/scrapyard-dashboard",
          icon: faTachometerAlt,
          label: "Overview",
        },
      ],
    },

    {
      section: "ORDERS (BUYERS)",
      items: [
        {
          to: "/scraporders",
          icon: faShoppingCart,
          label: "Company Orders",
        },
        {
          to: "/customerorders",
          icon: faShoppingCart,
          label: "Customer Orders",
        },
      ],
    },

    {
      section: "PRODUCT MANAGEMENT",
      items: [
        {
          to: "/scrapyard-products/allproducts",
          icon: faBox,
          label: "All Products",
        },
        {
          to: "/scrapyard-products/add",
          icon: faPlusCircle,
          label: "Add Product",
        },
        {
          to: "/scrapyard/orders",
          icon: faClipboardList,
          label: "Product Orders",
        },
      ],
    },
    {
      section: "DELIVERY MANAGEMENT",
      items: [
        {
          to: "/scrapyard/delivery",
          icon: faTruck,
          label: "All Deliveries",
        },

        {
          to: "/scrapyard/delivery/out-for-delivery",
          icon: faTruck,
          label: "Out For Delivery",
        },

        {
          to: "/scrapyard/delivery/in-transit",
          icon: faTruck,
          label: "In Transit",
        },

        {
          to: "/scrapyard/delivery/delivered",
          icon: faTruck,
          label: "Delivered Orders",
        },

        {
          to: "/scrapyard/delivery/failed",
          icon: faTruck,
          label: "Failed Deliveries",
        },

        {
          to: "/scrapyard/delivery/pickup-pending",
          icon: faTruck,
          label: "Pickup Pending",
        },
      ],
    },

    {
      section: "CUSTOMER FEEDBACK",
      items: [
        {
          to: "/scrapyard/reviews",
          icon: faStar,
          label: "Reviews",
        },
      ],
    },

    {
      section: "FINANCE",
      items: [
        {
          to: "/scrapyard-transactions",
          icon: faCreditCard,
          label: "Transactions",
        },
      ],
    },

    {
      section: "ACCOUNT",
      items: [
        { to: "/scrapyardprofile", icon: faUser, label: "Profile" },
        { to: "/scrapyard-settings", icon: faCog, label: "Settings" },
      ],
    },
  ];

  const bottomItems = [{ to: "/logout", icon: faSignOutAlt, label: "Logout" }];

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div id="sidebar-wrapper">
        <div className="sidebar-heading">{BRANDNAME}</div>

        {navSections.map((group) => (
          <div key={group.section}>
            <div className="sidebar-section-label">{group.section}</div>

            <div className="list-group list-group-flush">
              {group.items.map(({ to, icon, label }) => (
                <Link key={to} to={to} className={linkClass(to)}>
                  <FontAwesomeIcon icon={icon} className="icon" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Bottom */}
        <div className="sidebar-bottom">
          <div className="sidebar-divider" />
          <div className="list-group list-group-flush">
            {bottomItems.map(({ to, icon, label }) => (
              <Link key={to} to={to} className={linkClass(to)}>
                <FontAwesomeIcon icon={icon} className="icon" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE BUTTON */}
      <button
        className="sb-mobile-toggle"
        onClick={() => setOffcanvasOpen(!isOffcanvasOpen)}
      >
        <FontAwesomeIcon icon={faHome} />
      </button>

      {/* BACKDROP */}
      {isOffcanvasOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 1040,
          }}
          onClick={() => setOffcanvasOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`offcanvas offcanvas-start ${isOffcanvasOpen ? "show" : ""}`}
        style={{
          visibility: isOffcanvasOpen ? "visible" : "hidden",
          transform: isOffcanvasOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s ease",
          zIndex: 1050,
        }}
      >
        <div className="offcanvas-header">
          <h5>{BRANDNAME}</h5>
          <button
            className="btn-close"
            onClick={() => setOffcanvasOpen(false)}
          />
        </div>

        <div className="offcanvas-body">
          {navSections.map((group) => (
            <div key={group.section}>
              <div className="sidebar-section-label">{group.section}</div>

              <div className="list-group list-group-flush">
                {group.items.map(({ to, icon, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className={linkClass(to)}
                    onClick={() => setOffcanvasOpen(false)}
                  >
                    <FontAwesomeIcon icon={icon} className="icon" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="sidebar-bottom">
            <div className="sidebar-divider" />
            <div className="list-group list-group-flush">
              {bottomItems.map(({ to, icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={linkClass(to)}
                  onClick={() => setOffcanvasOpen(false)}
                >
                  <FontAwesomeIcon icon={icon} className="icon" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrapyardSidebar;
