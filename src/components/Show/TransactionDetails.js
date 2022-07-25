import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import "./TransactionDetails.scss";

const API = process.env.REACT_APP_API_URL;

const TransactionDetails = () => {
  const { index } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState({});

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((res) => {
        setTransaction(res.data);
      })
      .catch((err) => {
        navigate("/transaction-error");
      });
  }, [index, navigate]);

  const handleDelete = () => {
    axios.delete(`${API}/transactions/${index}`).then(() => {
      navigate("/transactions");
    });
  };

  return (
    <section className="transactionDetailsSection">
      <h1>Transaction Details</h1>
      <h3>Item name: {transaction.item_name}</h3>
      <h3>Amount: ${transaction.amount}</h3>
      <h3>Date: {moment(transaction.date).format("MMMM Do, YYYY")}</h3>
      <h3>From: {transaction.from}</h3>
      <h3>Category: {transaction.category}</h3>

      <section className="transactionLinks">
        <Link to="/transactions">
          <Button variant="primary">Back to Transactions</Button>
        </Link>
        <Link to={`/transactions/${index}/edit`}>
          <Button variant="secondary">Edit Transaction</Button>
        </Link>
        <Button variant="danger" onClick={handleDelete}>
          Delete Transaction
        </Button>
      </section>
    </section>
  );
};

export default TransactionDetails;
