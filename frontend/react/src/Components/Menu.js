import React from "react";
import "./Menu.css";
import { Link, NavLink } from "react-router-dom";
function Menu() {
  return (
    <>
      <div className="Navbars">
        <ul className="NavbarWrappers">
          <li className="NavbarElement">
            <NavLink className="link" to="/">
              Home
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link" to="/quiz">
              Quiz
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link" to="/progress">
              Track Progress
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link" to="/about-us">
              About Us
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link" to="/contact-us">
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Menu;
