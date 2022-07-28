import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { nanoid } from "nanoid";

import moment from "moment";
import axios from "axios";

import "./Transactions.scss";

import TransactionModal from "./TransactionModal";

const API = process.env.REACT_APP_API_URL;

const Transactions = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [Show, setShow] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    axios.get(`${API}/transactions`).then((res) => {
      res.data.forEach((transaction) => {
        transaction.id = nanoid();
      });
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

  const handleDelete = async (id, transactionIndex) => {
    transactions.map((transaction, index) => {
      if (transaction.id === id) {
        transactionIndex = index;
      }

      return transactionIndex;
    });

    await axios
      .delete(`${API}/transactions/${transactionIndex}`)
      .then((res) => {
        handleClose();
        transactions.splice(transactionIndex, 1);
        setTransactions([...transactions]);
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
      pauseOnFocusLoss: false,
      draggable: true,
      progress: undefined,
    });
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (id) => {
    setId(id);
    setShow(true);
  };

  return (
    <section className="transactionsSection">
      <h1>Bank Account Total: ${transactionTotal(transactions)}</h1>
      <ul>
        {transactions.map((transaction, index) => {
          return (
            <li key={index}>
              <div>
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigate(`/authenticated/transactions/${index}/edit`);
                  }}
                >
                  EDIT
                </Button>
              </div>
              <strong className="transactionDate">
                {formatDate(transaction.date)}
              </strong>
              <div>
                <Link
                  to={`/authenticated/transactions/${index}`}
                  className="transactionLink"
                >
                  {transaction.item_name}
                </Link>
              </div>
              <span className="transactionAmount">
                ${transaction.amount}
                <Button
                  variant="danger"
                  onClick={() => {
                    handleShow(transaction.id);
                  }}
                >
                  X
                </Button>
              </span>

              <TransactionModal
                Show={Show}
                handleClose={handleClose}
                id={id}
                index={index}
                handleDelete={handleDelete}
              />
            </li>
          );
        })}
      </ul>

      <ToastContainer autoClose={3000} theme="dark" />
    </section>
  );
};

export default Transactions;
