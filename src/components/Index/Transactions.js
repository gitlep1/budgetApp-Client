import { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/transactions`)
      .then((res) => setTransactions(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section>
      <h1>Transactions</h1>
      <ul>
        {transactions.map((transaction, index) => {
          return (
            <li key={index}>
              <h2>{transaction.item_name}</h2>
              <p>{transaction.amount}</p>
              <p>{transaction.date}</p>
              <p>{transaction.from}</p>
              <p>{transaction.category}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Transactions;
