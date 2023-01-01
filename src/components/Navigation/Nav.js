import React, { useContext } from "react";
import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Nav = (props) => {
    const { user } = useContext(UserContext)
    const location = useLocation()
    if ((user && user.isAuthenticated === true) || location.pathname === '/') {
        return (
            <>
                <div className="topnav">
                    <NavLink to="/" activeclassname="selected" exact>Home</NavLink>
                    <NavLink to="/users" >User</NavLink>
                    <NavLink to="/projects" >Project</NavLink>
                    <NavLink to="/login" >Login</NavLink>
                    <NavLink to="/register" >Register</NavLink>
                </div>
            </>
        )
    } else {
        return <></>
    }
}

export default Nav;