import React, { useEffect, useState } from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom";

const Nav = (props) => {
    const [showNav, setShowNav] = useState(false)
    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            setShowNav(true)
        }

    }, [])
    return (
        <>
            {showNav === true &&
                <div className="topnav">
                    <NavLink to="/" activeclassname="selected" exact>
                        Home
                    </NavLink>
                    <NavLink to="/users" >
                        User
                    </NavLink>
                    <NavLink to="/projects" >
                        Project
                    </NavLink>
                    <NavLink to="/login" >
                        Login
                    </NavLink>
                    <NavLink to="/register" >
                        Register
                    </NavLink>
                </div>
            }
        </>
    )
}

export default Nav;