import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.scss";

const Homepage = () => {
  return (
    <section className="homepageSection">
      <h1>Welcome to the Budget App</h1>
      <h3>The app to help you manage your earnings and spendings!</h3>
    </section>
  );
};

export default Homepage;
