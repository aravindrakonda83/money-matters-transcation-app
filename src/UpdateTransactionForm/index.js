import React, { useState } from "react";
import axios from "axios";

const UpdateTransactionForm = ({ transaction, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: transaction.name,
    type: transaction.type,
    category: transaction.category,
    amount: transaction.amount,
    date: transaction.date,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform validations
    if (!formData.name || formData.name.length > 30) {
      alert(
        "Transaction Name is required and should be maximum of 30 characters."
      );
      return;
    }

    if (isNaN(formData.amount) || formData.amount <= 0) {
      alert("Amount should be a numeric value greater than zero.");
      return;
    }

    try {
      const apiEndpoint = `https://bursting-gelding-24.hasura.app/api/rest/update-transaction/${transaction.id}`;
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await axios.put(apiEndpoint, formData, { headers });

      if (response.data.success) {
        alert("Transaction updated successfully!");
        onUpdate(response.data.transaction);
        onClose();
      } else {
        alert("Failed to update transaction.");
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
      alert("Failed to update transaction.");
    }
  };

  return (
    <div className="update-transaction-form">
      <h2>Edit Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Transaction Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={30}
          />
        </div>
        <div>
          <label>Transaction Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>
        <div>
          <label>Transaction Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="entertainment">Entertainment</option>
            <option value="food">Food</option>
            <option value="shopping">Shopping</option>
            {/* Add other category options as needed */}
          </select>
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min={0}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateTransactionForm;
