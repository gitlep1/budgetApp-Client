import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import "./Transactions.scss";

const API = process.env.REACT_APP_API_URL;

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get(`${API}/transactions`).then((res) => {
      setTransactions(res.data);
    });
  }, []); // eslint-disable-line

  const addAmount = (transactions) => {
    let total = 0;

    transactions.forEach((transaction) => {
      total += transaction.amount;
    });

    return total.toFixed(2);
  };

  const formatDate = (date) => {
    return moment(date).format("MMMM Do");
  };

  return (
    <section className="transactionsSection">
      <h1>Bank Account Total: ${addAmount(transactions)}</h1>
      <ul>
        {transactions.map((transaction, index) => {
          return (
            <li key={index}>
              <strong className="transactionDate">
                {formatDate(transaction.date)}
              </strong>
              <Link to={`/transactions/${index}`} className="transactionLink">
                {transaction.item_name}
              </Link>
              <span className="transactionAmount">${transaction.amount}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Transactions;
