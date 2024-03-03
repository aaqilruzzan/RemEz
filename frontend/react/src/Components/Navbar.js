import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
function Navbar({ clicked, isClicked }) {
  const handleClicked = () => {
    isClicked(!clicked);
    console.log("clicked");
  };
  return (
    <div className="Nav">
      
      <ul className="NavbarWrapper">
      
        <li className="NavLogo">
          <Link to="/" className="Link">
            
            Quiz Generator
          </Link>
        </li>
        <li className="NavElements">
          <NavLink to="/" className="Link">
            Home
          </NavLink>
        </li>
        <li className="NavElements">
          <NavLink to="/quiz" className="Link">
            Quiz
          </NavLink>
        </li>
        <li className="NavElements">
          <NavLink to="/progress" className="Link">
            Track Progress
          </NavLink>
        </li>
        <li className="NavElements">
          <NavLink to="/about-us" className="Link">
            About us
          </NavLink>
        </li>
        <li className="NavElements">
          <NavLink to="/contact-us" className="Link">
            Contact Us
          </NavLink>
        </li>
        <li className="NavButton">
          <NavLink to="/sign-up" className="Link">
            Log Out
          </NavLink>
        </li>
      </ul>
      {!clicked ? (
        <GiHamburgerMenu onClick={handleClicked} className="Icon" />
      ) : (
        <ImCross onClick={handleClicked} className="Icon" />
      )}
    </div>
  );
}

export default Navbar;
