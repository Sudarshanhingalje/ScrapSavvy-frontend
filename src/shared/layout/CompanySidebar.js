import {
  faClipboardList,
  faCreditCard,
  faTachometerAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import scrapsavvylogo from "../../assets/images/scrapsavvylogo.png";
import "../../static/Sidebar.css";
import { BRANDNAME } from "../utils/Utils";

const CompanySidebar = () => {
  const [isOffcanvasOpen, setOffcanvasOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `list-group-item list-group-item-action ${isActive(path) ? "active" : ""}`;

  const navItems = [
    {
      section: "MAIN",
      items: [
        { to: "/companydashboard", label: "Dashboard", icon: faTachometerAlt },
      ],
    },
    {
      section: "ORDERS",
      items: [
        {
          to: "/companydashboard/scraporder",
          label: "Scrap Orders",
          icon: faClipboardList,
        },
        {
          to: "/companydashboard/ordershistory",
          label: "Order History",
          icon: faClipboardList,
        },
      ],
    },
    {
      section: "PRODUCTS",
      items: [
        {
          to: "/cuslistofscraps",
          label: "Products",
          icon: faClipboardList,
        },
        {
          to: "/cuProductorders",
          label: "My Orders",
          icon: faClipboardList,
        },
      ],
    },
    {
      section: "FINANCE",
      items: [
        { to: "/companypayments", label: "Payments", icon: faCreditCard },
      ],
    },
    {
      section: "ACCOUNT",
      items: [{ to: "/companyprofile", label: "Profile", icon: faUser }],
    },
  ];

  return (
    <>
      <div id="sidebar-wrapper">
        <div className="sidebar-heading">
          <img
            src={scrapsavvylogo}
            alt={BRANDNAME}
            className="sidebar-logo-img"
          />
        </div>

        {navItems.map((group) => (
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
      </div>
    </>
  );
};

export default CompanySidebar;
