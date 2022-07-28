import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./NavBar.scss";

const API = process.env.REACT_APP_API_URL;

const NavBar = ({ authenticated, user, guest }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }); // eslint-disable-line

  const fetchData = async () => {
    await axios.get(`${API}/transactions`).then((res) => {
      setTransactions(res.data);
    });
  };

  const transactionTotal = (transactions) => {
    let total = 0;

    transactions.map((transaction) => {
      return (total += transaction.amount);
    });

    return total.toFixed(2);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        Budget App
      </Link>
      {authenticated ? (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="authenticated/transactions" className="nav-link">
              Transactions
            </Link>
          </li>
          <li>
            <Link to="authenticated/transactions/new" className="nav-link">
              New Transaction
            </Link>
          </li>
        </ul>
      ) : null}
      {authenticated ? (
        <div className="authStuff">
          {guest ? <h3>Guest</h3> : <h3>{user.username}'s</h3>}
          Total: ${transactionTotal(transactions)}
        </div>
      ) : null}
    </nav>
  );
};

export default NavBar;
