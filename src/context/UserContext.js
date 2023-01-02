import React, { useState, useEffect } from "react";
import { getUserAccount } from "../services/apiService";

const UserContext = React.createContext(null);
const UserProvider = ({ children }) => {
    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: '',
        account: {}
    }
    const location = window.location.pathname
    const [user, setUser] = useState({
        isLoading: true,
        isAuthenticated: false,
        token: '',
        account: {}
    });

    // Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false })
    };

    // Logout updates the user data to default
    const logoutContext = () => {
        setUser({ ...userDefault, isLoading: false })
    };

    const fecthUser = async () => {
        let response = await getUserAccount()
        if (response && response.EC === 0) {
            let groupWithRoles = response.DT.groupWithRoles
            let email = response.DT.email
            let username = response.DT.username
            let token = response.DT.access_token

            let data = {
                isAuthenticated: true,
                token: token,
                account: { groupWithRoles, email, username },
                isLoading: false
            }
            setTimeout(() => {
                setUser(data)
            }, 1 * 200);

        } else {
            setUser({ ...userDefault, isLoading: false })
        }
    }

    useEffect(() => {
        if (location !== '/' && location !== '/login') {
            fecthUser()
        } else {
            setUser({ ...user, isLoading: false })
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider } 