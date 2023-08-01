import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import axios from "axios";
import LoginForm from "./LoginForm.js";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import YourTransactions from "./YourTransactions";
import AllTransactions from "./AllTransactions";
import Profile from "./Profile";
import Logout from "./Logout";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      // Replace this with your actual login logic using the API
      const user = await loginUser(email, password);
      setIsLoggedIn(true);
      setUserRole(user.role);
      setUserId(user.id);
    } catch (error) {
      console.error("Login Error:", error);
      // Handle login error
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    setUserId(null);
  };

  const loginUser = async (email, password) => {
    const apiEndpoint =
      "https://bursting-gelding-24.hasura.app/api/rest/get-user-id";
    const headers = {
      "Content-Type": "application/json",
    };

    const requestBody = {
      email: email,
      password: password,
    };

    const response = await axios.post(apiEndpoint, requestBody, { headers });
    return response.data; // Assuming the API response contains user details and role
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <React.Fragment>
            <Sidebar isAdmin={userRole === "admin"} />
            <Route path="/dashboard" exact>
              <Dashboard isAdmin={userRole === "admin"} userId={userId} />
            </Route>
            {userRole === "admin" ? (
              <Route path="/all-transactions" exact>
                <AllTransactions />
              </Route>
            ) : (
              <Route path="/your-transactions" exact>
                <YourTransactions userId={userId} />
              </Route>
            )}
            <Route path="/profile" exact>
              <Profile userId={userId} />
            </Route>
            <Route path="/logout" exact>
              <Logout onLogout={handleLogout} />
            </Route>
          </React.Fragment>
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
};

export default App;