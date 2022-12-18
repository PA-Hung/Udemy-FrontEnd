import Nav from "./components/Navigation/Nav";
import React, { useEffect, useState } from "react";
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from "./components/Views/Login";
import Register from "./components/Views/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Users from "./components/Views/Users";
import _ from "lodash"

function App() {
  const [account, setAccount] = useState({})
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session))
    }
  }, [])

  return (
    <Router>
      <div className="App">
        <header className="App-container">
          {
            account && !_.isEmpty(account) && account.isAuthenticated && <Nav />
          }
          <Switch>
            <Route exact path="/">
              Home
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/dashboard">
              Dashboard
            </Route>
            <Route path="*">
              404 not found
            </Route>
          </Switch>

        </header>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}

    </Router>
  );
}

export default App;
