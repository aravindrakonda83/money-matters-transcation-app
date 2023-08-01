import React, { useState } from "react";
import axios from "axios";
import "./index.css"; // Import the CSS file

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Perform client-side validations
      if (!validateEmail(email)) {
        // Handle invalid email format
        alert("Invalid email format!");
        return;
      }

      // Call the loginUser function to make API request
      const user = await loginUser(email, password);
      // Handle the API response and user authentication
      console.log(user); // Placeholder for handling the API response
    } catch (error) {
      console.error("Login Error:", error);
      // Handle error and show failure view
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

    // Set x-hasura-role header based on the provided email
    if (email === "admin@gmail.com") {
      headers["x-hasura-admin-secret"] =
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzY";
      headers["x-hasura-role"] = "admin";
    } else {
      headers["x-hasura-role"] = "user";
    }

    const response = await axios.post(apiEndpoint, requestBody, { headers });
    return response.data; // Assuming the API response contains user details and role
  };

  return (
    <div className="container">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
