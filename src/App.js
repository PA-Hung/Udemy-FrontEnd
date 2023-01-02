import NavHeader from "./components/Navigation/NavHeader";
import AppRoutes from "./routers/AppRoutes";
import React, { useEffect, useState } from "react";
import './App.scss';
import { BrowserRouter as Router, } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bars } from 'react-loader-spinner'
import { UserContext } from "./context/UserContext";



function App() {
  const { user } = React.useContext(UserContext)
  return (
    <>
      <Router>
        {user && user.isLoading ?
          <div className="loading-container">
            <Bars
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            <div className="loading-text">Loading ...</div>
          </div>
          :
          <>
            <div className="app-header">
              <NavHeader />
            </div>
            <div className="App">
              <header className="App-container">
                <AppRoutes />
              </header>
            </div>
          </>
        }
      </Router>


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
    </>
  );
}

export default App;
