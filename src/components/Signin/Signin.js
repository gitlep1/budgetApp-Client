import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import "./Signin.scss";

const API = process.env.REACT_APP_API_URL;

const Signin = ({ handleSignin, handleSigninClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.get(`${API}/transactions-members/users`).then((res) => {
      checkIfUserExists(res.data);
    });
  };

  const checkIfUserExists = (users) => {
    const user = users.find((user) => {
      return user.email === email && user.password === password;
    });

    if (user) {
      handleSignin(user, "");
      handleSigninClose();
    } else {
      handleSignin(null, "Invalid email or password");
    }
  };

  return (
    <section className="signinSection">
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

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </Form.Group>

        <br />
        <Button variant="primary" type="submit">
          Sign in
        </Button>
      </Form>
    </section>
  );
};

export default Signin;
