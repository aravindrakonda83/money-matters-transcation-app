import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const AllTransactions = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadTransactions = async () => {
    if (!hasMore || loading) return;

    setLoading(true);

    try {
      const apiEndpoint =
        "https://bursting-gelding-24.hasura.app/api/rest/all-transactions";
      const pageSize = 10; // Number of transactions to load per page

      const response = await axios.get(apiEndpoint, {
        params: {
          page: page,
          pageSize: pageSize,
        },
      });

      const newTransactions = response.data;
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        ...newTransactions,
      ]);

      // If the API response has fewer transactions than the pageSize, it means no more data available
      if (newTransactions.length < pageSize) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error loading transactions:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    // Load transactions when the component mounts
    loadTransactions();

    // Cleanup function to reset transactions when the component unmounts
    return () => {
      setTransactions([]);
    };
  }); // Empty dependency array means this effect runs only once, on mount

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTransactions = () => {
    return transactions.map((transaction) => (
      // Render each transaction item here
      <div key={transaction.id}>
        <p>User Name: {transaction.userName}</p>
        <p>Transaction Name: {transaction.name}</p>
        <p>Category: {transaction.category}</p>
        <p>Amount: {transaction.amount}</p>
        <p>Date: {transaction.date}</p>
      </div>
    ));
  };

  return (
    <div className="all-transactions">
      <h2>All Transactions</h2>
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === "all" ? "active" : ""}`}
          onClick={() => handleTabChange("all")}
        >
          All Transactions
        </button>
        <button
          className={`tab-button ${activeTab === "credit" ? "active" : ""}`}
          onClick={() => handleTabChange("credit")}
        >
          Credit
        </button>
        <button
          className={`tab-button ${activeTab === "debit" ? "active" : ""}`}
          onClick={() => handleTabChange("debit")}
        >
          Debit
        </button>
      </div>
      <div>
        {activeTab === "all" && renderTransactions()}
        {activeTab === "credit" && <p>Credit Transactions</p>}
        {activeTab === "debit" && <p>Debit Transactions</p>}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default AllTransactions;
