import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Navbar({ clicked, isClicked }) {
  const navigate = useNavigate();
  const handleClicked = () => {
    isClicked(!clicked);
    console.log("clicked");
  };
  return (
    <div className="Nav">
      <ul className="NavbarWrapper">
        <li className="NavLogo">
          <Link to="/" className="Link">
            RemEz
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
        <li>
          <div className="fixed top-[60px] right-4 z-50 flex gap-4 p-2 bg-gray-100 rounded-lg shadow-md">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="cursor-pointer text-lg text-gray-700 hover:text-blue-500"
              onClick={() => navigate("/notes")}
            />
            <FontAwesomeIcon
              icon={faBell}
              className="cursor-pointer text-lg text-gray-700 hover:text-blue-500"
              onClick={() => navigate("/reminders")}
            />
          </div>
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
