import React from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom";

const Nav = (props) => {
    return (
        <div className="topnav">
            <NavLink to="/" activeclassname="selected" exact>
                Home
            </NavLink>
            <NavLink to="/about" >
                About
            </NavLink>
            <NavLink to="/contact" >
                Contact
            </NavLink>
            <NavLink to="/dashboard" >
                Dashboard
            </NavLink>
        </div>
    )
}

export default Nav;