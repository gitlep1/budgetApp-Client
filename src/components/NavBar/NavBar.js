// import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import "./NavBar.scss";

// const API = process.env.REACT_APP_API_URL;

const NavBar = ({ authenticated, user, guest }) => {
  // couldn't figure out how to get the total to show in the NavBar tried so many different ways. Would like to go over this in flex time \\

  // const [transactions, setTransactions] = useState([]);
  // const [total, setTotal] = useState(0);

  // let totalRef = useRef(0);

  // useEffect(() => {
  //   axios.get(`${API}/transactions`).then((res) => {
  //     // setTransactions(res.data);
  //     const interval = setInterval(() => {
  //       transactionTotal(res.data);
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   });

  //   // const interval = setInterval(() => {
  //   //   axios.get(`${API}/transactions`).then((res) => {
  //   //     setTransactions(res.data);
  //   //   });

  //   //   totalRef.current = transactions.reduce((acc, curr) => {
  //   //     return acc + curr.amount;
  //   //   }, 0);
  //   // }, 1000);

  //   // return () => clearInterval(interval);
  // }, []); // eslint-disable-line

  // const transactionTotal = (transactions) => {
  // axios.get(`${API}/transactions`).then((res) => {
  //   setTransactions(res.data);
  // });

  // const interval = setInterval(() => {
  //   let total = 0;
  //   transactions.forEach((transaction) => {
  //     total += transaction.amount;
  //   });
  //   totalRef.current = total.toFixed(2);
  // }, 1000);

  // console.log(totalRef.current);
  // return () => clearInterval(interval);

  // let total = 0;

  // transactions.map((transaction) => {
  //   return (total += transaction.amount);
  // });

  // return total.toFixed(2);
  // };
  // transactionTotal(transactions);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        Budget App
      </Link>
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
      {authenticated ? (
        <div className="authStuff">
          {guest ? <h3>Guest's</h3> : <h3>{user.username}'s</h3>}
        </div>
      ) : null}
      <h3 className="authStuff">Total: $0</h3>
      {/* <h3 className="NavBarTotal">${totalRef.current}</h3> */}
    </nav>
  );
};

export default NavBar;
