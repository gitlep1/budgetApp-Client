import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import "./Signup.scss";

const API = process.env.REACT_APP_API_URL;

const Signup = ({ handleClose, handleNotify }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const users = [];

    await axios.get(`${API}/transactions-members/users`).then((res) => {
      users.push(...res.data);
    });

    let same = false;

    users.map((user) => {
      if (user.email === email) {
        same = true;
      }
      return same;
    });

    if (same === true) {
      handleNotify(null, "Email already exists!");
      return;
    }

    if (password !== confirmPassword) {
      handleNotify(null, "Passwords do not match!");
      return;
    }

    const userData = {
      username: username,
      password: password,
      email: email,
      transactions: [],
    };

    if (username === "" || password === "" || email === "") {
      handleNotify(null, "Please fill out all fields!");
      return;
    }

    await axios
      .post(`${API}/transactions-members/users`, userData)
      .then((res) => {
        handleNotify(userData, "");
        handleClose();
      })
      .catch((err) => {
        handleNotify(null, `${err}`);
      });
  };

  return (
    <section className="signupSection">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Sign up
        </Button>
      </Form>
    </section>
  );
};

export default Signup;
