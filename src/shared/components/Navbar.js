// src/shared/layout/Navbar.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import scrapsavvylogo from "../../assets/images/scrapsavvylogo.png";

import "../../shared/layout/styles/Nav.css";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    {
      label: "HOME",
      path: "/",
    },
    {
      label: "SIGNUP",
      path: "/signup",
    },
    {
      label: "SIGNIN",
      path: "/signin",
    },
  ];

  return (
    <header className={isScrolled ? "scrolled" : ""}>
      <div className="header-content">
        {/* LOGO */}

        <div className="logo">
          <Link to="/" className="sp-nav__logo">
            <img
              src={scrapsavvylogo}
              alt="ScrapSavvy Logo"
              className="sp-nav__logo-img"
            />
          </Link>
        </div>

        {/* NAV LINKS */}

        <nav className="header-links">
          {navItems.map((item, index) => (
            <div key={index} className="nav-item">
              <Link to={item.path} onClick={() => toggleDropdown(index)}>
                {item.label}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
