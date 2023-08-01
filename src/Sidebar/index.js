import React from "react";
import "./index.css";

const Sidebar = ({ isAdmin }) => {
  return (
    <div>
      <h2>Navigation</h2>
      <ul>
        <li>
          <a href="/">Dashboard</a>
        </li>
        {isAdmin ? (
          <React.Fragment>
            <li>
              <a href="/all-transactions">All Transactions</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li>
              <a href="/your-transactions">Your Transactions</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
          </React.Fragment>
        )}
        <li>
          <a href="/logout">Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
