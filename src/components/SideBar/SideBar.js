import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

import "./SideBar.scss";

import Signup from "../Signup/Signup";
import Signin from "../Signin/Signin";

const SideBar = ({
  authenticated,
  guest,
  user,
  handleUser,
  handleGuest,
  handleLogout,
}) => {
  const [ShowSignup, setShowSignup] = useState(false);
  const handleSignupClose = () => setShowSignup(false);
  const handleSignupShow = () => setShowSignup(true);

  const [ShowSignin, setShowSignin] = useState(false);
  const handleSigninClose = () => setShowSignin(false);
  const handleSigninShow = () => setShowSignin(true);

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
        <h1>{user.username}</h1>
      </section>
    );
  };

  const handleSignup = (newUser, error) => {
    if (error === "") {
      toast.success(
        `${newUser.username} successfully signed up. \n You have been automatically logged in.`,
        {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: true,
          progress: undefined,
        }
      );
      handleUser(newUser);
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

  const handleSignin = (user, error) => {
    if (error === "") {
      toast.success(`${user.username} successfully signed in.`, {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
      });
      handleUser(user);
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
      {authenticated ? (
        <section>
          {guest ? renderGuest() : renderUser()}
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </section>
      ) : (
        <section className="sidebarLinks">
          <h1>Menu</h1>
          <Button
            variant="success"
            onClick={() => {
              handleSigninShow();
            }}
          >
            Sign in
          </Button>

          <br />
          <br />
          <Button
            variant="primary"
            onClick={() => {
              handleSignupShow();
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
      )}

      {/* Signup Modal */}
      <Modal
        className="signupModal"
        show={ShowSignup}
        onHide={handleSignupClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Signup
            handleSignupClose={handleSignupClose}
            handleSignup={handleSignup}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSignupClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Signin Modal */}
      <Modal
        className="signinModal"
        show={ShowSignin}
        onHide={handleSigninClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Signin
            handleSigninClose={handleSigninClose}
            handleSignin={handleSignin}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSigninClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer autoClose={3000} theme="dark" />
    </section>
  );
};

export default SideBar;
