import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import "./NewTransaction.scss";

const API = process.env.REACT_APP_API_URL;

const NewTransaction = () => {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [from, setFrom] = useState("");
  const [category, setCategory] = useState("");

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "itemName") {
      setItemName(value);
    } else if (name === "amount") {
      setAmount(value);
    } else if (name === "date") {
      setDate(value);
    } else if (name === "from") {
      setFrom(value);
    } else if (name === "category") {
      setCategory(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = {
      item_name: itemName,
      amount: Number(amount),
      date: date,
      from: from,
      category: category,
    };

    await axios
      .post(`${API}/transactions`, newTransaction)
      .then((res) => {
        notify();
      })
      .catch((err) => {
        setError(err);
      });
  };

  const notify = () => {
    toast.success(
      "A new transaction has been created. \n You will be redirected in 3 seconds.",
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
    <section className="newTransactionSection">
      <h1>New Transaction</h1>
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
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
        <Link to="/transactions" className="transactionLink">
          <Button variant="secondary">Cancel</Button>
        </Link>
      </Form>

      <ToastContainer autoClose={3000} theme="dark" />
      {error && <p className="error">{error}</p>}
    </section>
  );
};

export default NewTransaction;
