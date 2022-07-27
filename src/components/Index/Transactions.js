import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import axios from "axios";
import "./Transactions.scss";

const API = process.env.REACT_APP_API_URL;

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  const [Show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get(`${API}/transactions`).then((res) => {
      setTransactions(res.data);
    });
  }, []); // eslint-disable-line

  const transactionTotal = (transactions) => {
    let total = 0;

    transactions.map((transaction) => {
      return (total += transaction.amount);
    });

    return total.toFixed(2);
  };

  const formatDate = (date) => {
    return moment(date).format("MMMM Do");
  };

  const handleDelete = async (index) => {
    await axios.delete(`${API}/transactions/${index}`).then((res) => {
      handleClose();
    });
    axios.get(`${API}/transactions`).then((res) => {
      setTransactions(res.data);
    });

    notify();
  };

  const notify = () => {
    toast.success("Transaction deleted", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <section className="transactionsSection">
      <h1>Bank Account Total: ${transactionTotal(transactions)}</h1>
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
              <span className="transactionAmount">
                ${transaction.amount}
                <Button
                  variant="danger"
                  onClick={() => {
                    handleShow();
                  }}
                >
                  X
                </Button>
              </span>

              <Modal
                className="transactionModal"
                show={Show}
                onHide={handleClose}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Delete Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to delete this transaction?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="success"
                    onClick={() => {
                      handleDelete(index);
                    }}
                  >
                    Confirm
                  </Button>

                  <Button variant="danger" onClick={handleClose}>
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>

              <ToastContainer autoClose={3000} theme="dark" />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Transactions;
