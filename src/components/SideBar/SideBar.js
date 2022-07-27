import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SideBar.scss";

const SideBar = () => {
  return (
    <section className="SideBar">
      <Link to="/login">
        <Button variant="primary">Login</Button>
      </Link>
    </section>
  );
};

export default SideBar;
