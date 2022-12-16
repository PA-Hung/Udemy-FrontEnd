import Nav from "./components/Navigation/Nav";
import React from "react";
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-container">
          <Nav />
          <Switch>
            <Route exact path="/">
              Home
            </Route>
            <Route path="/about">
              About
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
