import Nav from "./components/Navigation/Nav";
import AppRoutes from "./routers/AppRoutes";
import React, { useEffect, useState } from "react";
import './App.scss';
import { BrowserRouter as Router, } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [account, setAccount] = useState({})
  //console.log(account)
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session))
    }
  }, [])

  return (
    <>
      <Router>
        <div className="app-header">
          <Nav />
        </div>
        <div className="App">
          <header className="App-container">
            <AppRoutes />
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
    </>
  );
}

export default App;
