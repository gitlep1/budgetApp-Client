import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Sidebar from "./components/SideBar/SideBar";

import Homepage from "./pages/Home";
import Index from "./pages/Index";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Show from "./pages/Show";
import FourOFour from "./pages/FourOFour";

import "./App.scss";

const App = () => {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [guest, setGuest] = useState(false);

  const handleGuest = () => {
    setGuest(true);
    setAuthenticated(true);
    navigate("/transactions");
  };

  const handleUser = (user) => {
    setUser(user);
    setAuthenticated(true);
    navigate("/transactions");
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setGuest(false);
    setUser({});
    navigate("/transactions");
  };

  return (
    <section>
      <NavBar authenticated={authenticated} user={user} guest={guest} />

      <section className="mainSection">
        <Sidebar
          authenticated={authenticated}
          guest={guest}
          user={user}
          handleUser={handleUser}
          handleGuest={handleGuest}
          handleLogout={handleLogout}
        />

        <Routes>
          {/* <Route path="/" element={<Homepage />}> */}
          <Route path="/">
            <Route path="transactions" index element={<Index />} />
            <Route path="transactions/new" element={<New />} />
            <Route path="transactions/:index" element={<Show />} />
            <Route path="transactions/:index/edit" element={<Edit />} />
          </Route>

          {/* {authenticated ? (
            <Route path="/">
              <Route path="transactions" index element={<Index />} />
              <Route path="transactions/new" element={<New />} />
              <Route path="transactions/:index" element={<Show />} />
              <Route path="transactions/:index/edit" element={<Edit />} />
            </Route>
          ) : null} */}
          <Route
            path="*"
            element={<FourOFour authenticated={authenticated} />}
          />
        </Routes>
      </section>
    </section>
  );
};

export default App;
