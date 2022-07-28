import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SideBar.scss";

import Signup from "../Signup/Signup";

const API = process.env.REACT_APP_API_URL;

const SideBar = ({
  authenticated,
  guest,
  user,
  handleUser,
  handleGuest,
  handleLogout,
}) => {
  const [Show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderGuest = () => {
    return (
      <section>
        <h1>Guest</h1>
      </section>
    );
  };

  const renderUser = () => {
    return (
      <section>
        <h1>user</h1>
      </section>
    );
  };

  const handleNotify = (newUser, error) => {
    if (error === "") {
      toast.success(`${newUser.username} successfully signed up`, {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(error, {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <section className="SideBar">
      {authenticated ? <>{guest ? renderGuest() : renderUser()}</> : null}
      <h1>Menu</h1>
      <section className="sidebarLinks">
        <Link to="/login">
          <Button variant="success">Login</Button>
        </Link>
        <br />
        <br />
        <Button
          variant="primary"
          onClick={() => {
            handleShow();
          }}
        >
          Sign up
        </Button>
        <br />
        <br />
        <Button variant="secondary" onClick={handleGuest}>
          View as Guest
        </Button>
      </section>

      <Modal className="signupModal" show={Show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Signup
            handleClose={handleClose}
            handleNotify={handleNotify}
            // handleErrors={handleErrors}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer autoClose={3000} theme="dark" />
    </section>
  );
};

export default SideBar;
