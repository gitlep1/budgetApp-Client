import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import "./TransactionEdit.scss";

const API = process.env.REACT_APP_API_URL;

const TransactionEdit = () => {
  const { index } = useParams();
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((res) => {
        setItemName(res.data.item_name);
        setAmount(res.data.amount);
        setFrom(res.data.from);
        setDate(res.data.date);
        setCategory(res.data.category);
      })
      .catch((err) => setError(err));
  }, []); // eslint-disable-line

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "itemName") {
      setItemName(value);
    } else if (name === "amount") {
      setAmount(value);
    } else if (name === "from") {
      setFrom(value);
    } else if (name === "date") {
      setDate(value);
    } else if (name === "category") {
      setCategory(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const editedTransaction = {
      item_name: itemName,
      amount: Number(amount),
      from: from,
      date: date,
      category: category,
    };

    axios
      .put(`${API}/transactions/${index}`, editedTransaction)
      .then((res) => {
        notify();
      })
      .catch((err) => setError(err));
  };

  const notify = () => {
    toast.success(
      "Transaction has been updated. \n You will be redirected in 3 seconds.",
      {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
      }
    );
    setTimeout(() => {
      navigate("/transactions");
    }, 4100);
  };

  return (
    <section className="editTransactionSection">
      <h1>Edit Transaction</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicItemName">
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            name="itemName"
            value={itemName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicAmount">
          <Form.Label>Amount ($)</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={amount}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicFrom">
          <Form.Label>From</Form.Label>
          <Form.Control
            type="text"
            name="from"
            value={from}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={category}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Link to="/transactions">
          <Button variant="secondary">Cancel</Button>
        </Link>
      </Form>

      <ToastContainer autoClose={3000} theme="dark" />
      {error && <p className="error">{error}</p>}
    </section>
  );
};

export default TransactionEdit;
