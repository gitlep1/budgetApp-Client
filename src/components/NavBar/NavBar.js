import { Link } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        Budget App
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/transactions" className="nav-link">
            Transactions
          </Link>
        </li>
        <li>
          <Link to="/transactions/new" className="nav-link">
            New Transaction
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
