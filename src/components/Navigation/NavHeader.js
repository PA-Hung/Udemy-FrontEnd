import React, { useContext } from "react";
import "./NavHeader.scss";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React_logo from '../../assets/images/React_logo.png'
import { logoutUser } from "../../services/apiService";
import { toast } from "react-toastify";

const NavHeader = (props) => {
    const { user, logoutContext } = useContext(UserContext)
    const location = useLocation()
    const history = useHistory()

    const handleLogout = async () => {
        localStorage.removeItem('tokenJWT') // clear jwt local storage
        let data = await logoutUser() // clear cookie
        logoutContext() // clear user data in context
        if (data && data.EC === 0) {
            toast.success('Logout Success')
            history.push('/login')
        } else {
            toast.error(data.EM)
        }
    }

    if ((user && user.isAuthenticated === true) || location.pathname === '/') {
        return (
            <>

                <div className="nav-header">
                    <Navbar className="bg-header" expand="lg">
                        <Container>
                            <Navbar.Brand className="nav-brand">
                                <img
                                    src={React_logo}
                                    width="35"
                                    height="30"
                                    className="d-inline-block align-top"

                                />
                                <span className="px-3">Đông Y</span>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/" className='nav-link' exact>Home</NavLink>
                                    <NavLink to="/users" className='nav-link'>Manager</NavLink>
                                    <NavLink to="/roles" className='nav-link'>Roles</NavLink>
                                    <NavLink to="/projects" className='nav-link'>Project</NavLink>
                                </Nav>
                            </Navbar.Collapse>
                            <Nav>
                                {user && user.isAuthenticated === true
                                    ?
                                    <>
                                        <Nav.Item className="nav-link">Welcome {user.account.username} !</Nav.Item>
                                        <NavDropdown title="Setting " id="basic-nav-dropdown">
                                            <NavDropdown.Item>Change Password</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item>
                                                <span onClick={() => handleLogout()}>Logout</span>
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                    :
                                    <>
                                        <Link to="/login" className='nav-link'>Login</Link>
                                        <Link to="/register" className='nav-link'>Register</Link>
                                    </>

                                }

                            </Nav>
                        </Container>
                    </Navbar>
                </div>
            </>
        )
    } else {
        return <></>
    }
}

export default NavHeader;