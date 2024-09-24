import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/header-logo.png";
import searchIcon from "../images/icons/searchIcon.png";
import shoppingCart from "../images/icons/shopping-cart.png";
import menuIcon from "../images/icons/menu-icon.png"; // Add a menu icon for mobile
import "./Header.css";
import { useAuth } from "./Context/GlobalState";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, basket } = useAuth();
    const handleSignOut = () => {
        auth.signOut()
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <Link to="/">
                <img className="header-logo" src={Logo} alt="logo-img" />
            </Link>

            <div className="header-search">
                <input className="header-searchInput" type="text" placeholder="Search..." />
                <img className="header-searchIcon" src={searchIcon} alt="search-icon" />
            </div>

            <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
                <Link style={{ textDecoration: "none" }}
                    to={!user && "/login"}
                    className="header-option">
                    <span className="header-optionLineOne">Hello {user ? `${user.email}` : "Guest"}</span>
                    <span className="header-optionLineTwo" onClick={handleSignOut}>{user ? "Log Out" : "Sign In"}</span>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/orders" className="header-option">
                    <span className="header-optionLineOne">Returns</span>
                    <span className="header-optionLineTwo">& Orders</span>
                </Link>
                <div className="header-option">
                    <span className="header-optionLineOne">Your</span>
                    <span className="header-optionLineTwo">Prime</span>
                </div>
                <Link style={{ textDecoration: "none" }} to="/checkout" className="header-optionBasket">
                    <img src={shoppingCart} alt="cart-icon" />
                    <span className="header-basketCount">{basket.length < 1 ? "" : basket.length}</span>
                </Link>
            </nav>

            {/* Hamburger menu for mobile */}
            <button className="header-menuIcon" onClick={toggleMenu}>
                <img src={menuIcon} alt="menu-icon" />
            </button>
        </header>
    );
};

export default Header;
