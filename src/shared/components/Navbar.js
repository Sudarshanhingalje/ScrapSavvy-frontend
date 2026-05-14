import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["HOME", "SIGNUP", "SIGNIN"];

  return (
    <header className={isScrolled ? "scrolled" : ""}>
      <div className="header-content">
        <div className="logo">
          <Link to="/" className="sp-nav__logo">
            <span className="sp-nav__logo-mark">♻</span>
            <span className="sp-nav__logo-text">ScrapSavvy</span>
          </Link>
        </div>
        <nav className="header-links">
          {navItems.map((item, index) => (
            <div key={index} className="nav-item">
              <Link
                to={item === "LOGIN" ? "/login" : `/${item.toLowerCase()}`}
                onClick={() => toggleDropdown(index)}
              >
                {item}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
