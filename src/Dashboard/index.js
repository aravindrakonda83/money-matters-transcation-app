import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = ({ isAdmin }) => {
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [setChartData] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total credits and total debits
        const totalsEndpoint = isAdmin
          ? "https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin"
          : "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals";
        const totalsResponse = await axios.get(totalsEndpoint);
        const { total_credit, total_debit } = totalsResponse.data;
        setTotalCredit(total_credit);
        setTotalDebit(total_debit);

        // Fetch recent transactions
        const recentTransactionsEndpoint =
          "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?page=1&limit=3";
        const transactionsResponse = await axios.get(
          recentTransactionsEndpoint
        );
        setRecentTransactions(transactionsResponse.data);

        const chartDataEndpoint = isAdmin
          ? "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-last-7-days-admin"
          : "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days";
        const chartDataResponse = await axios.get(chartDataEndpoint);
        setChartData(chartDataResponse.data);
      } catch (error) {
        console.error("Dashboard API Error:", error);
        // Handle API errors
      }
    };
    fetchData();
  }, [isAdmin, setChartData]);

  return (
    <div>
      <h2>Dashboard</h2>
      {isAdmin ? (
        <>
          <p>Total Credit: {totalCredit}</p>
          <p>Total Debit: {totalDebit}</p>
        </>
      ) : (
        <>
          <p>Your Total Credit: {totalCredit}</p>
          <p>Your Total Debit: {totalDebit}</p>
        </>
      )}

      <h3>Recent Transactions</h3>
      <ul>
        {recentTransactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.description} - {transaction.amount} ({transaction.type}
            )
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
