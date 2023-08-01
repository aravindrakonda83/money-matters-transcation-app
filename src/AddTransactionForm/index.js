import React, { useState } from "react";
import axios from "axios";
import "./index.css"; // Add your custom CSS for the form here

const AddTransactionForm = ({ onAddTransaction }) => {
  const [transactionName, setTransactionName] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [transactionCategory, setTransactionCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Perform client-side validations
      if (
        !transactionName ||
        !transactionType ||
        !transactionCategory ||
        !amount ||
        !date
      ) {
        alert("All fields are required.");
        return;
      }

      if (transactionName.length > 30) {
        alert("Transaction Name should have a maximum of 30 characters.");
        return;
      }

      const amountValue = parseFloat(amount);
      if (isNaN(amountValue) || amountValue <= 0) {
        alert("Amount should be a numeric value greater than zero.");
        return;
      }

      // Call the API to add the transaction
      const newTransaction = {
        name: transactionName,
        type: transactionType,
        category: transactionCategory,
        amount: amountValue,
        date: date,
      };

      // Replace the API endpoint with the correct one for adding transactions
      const apiEndpoint =
        "https://bursting-gelding-24.hasura.app/api/rest/add-transaction";
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await axios.post(apiEndpoint, newTransaction, {
        headers,
      });

      // Reset the form fields after successful submission
      setTransactionName("");
      setTransactionType("");
      setTransactionCategory("");
      setAmount("");
      setDate("");

      // Notify parent component about the new transaction addition
      onAddTransaction(response.data); // Pass the response data or any other relevant information
      alert("Transaction added successfully!");
    } catch (error) {
      console.error("Add Transaction Error:", error);
      alert("Failed to add the transaction. Please try again later.");
    }
  };

  return (
    <div className="add-transaction-form">
      <h2>Add Transaction</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Transaction Name:</label>
          <input
            type="text"
            value={transactionName}
            onChange={(e) => setTransactionName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Transaction Type:</label>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            required
          >
            <option value="">Select Transaction Type</option>
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>
        </div>
        <div>
          <label>Transaction Category:</label>
          {/* Replace the options with the relevant categories */}
          <select
            value={transactionCategory}
            onChange={(e) => setTransactionCategory(e.target.value)}
            required
          >
            <option value="">Select Transaction Category</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            {/* Add more options based on your requirements */}
          </select>
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Add Transaction</button>
        </div>
      </form>
    </div>
  );
};

export default AddTransactionForm;
