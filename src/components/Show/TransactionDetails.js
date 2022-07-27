import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import axios from "axios";
import "./TransactionDetails.scss";

const API = process.env.REACT_APP_API_URL;

const TransactionDetails = () => {
  const { index } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState({});

  const [Show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const handleDelete = (index) => {
    axios.delete(`${API}/transactions/${index}`).then(() => {
      handleClose();
      notify();
    });
  };

  const notify = () => {
    toast.success(
      "Transaction has been deleted. \n You will be redirected in 3 seconds.",
      {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      }
    );
    setTimeout(() => {
      navigate("/transactions");
    }, 4100);
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
        <Button
          variant="danger"
          onClick={() => {
            handleShow();
          }}
        >
          Delete Transaction
        </Button>
      </section>

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
    </section>
  );
};

export default TransactionDetails;
