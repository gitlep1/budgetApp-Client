import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Index from "./pages/Index";
import Edit from "./pages/Edit";
import Show from "./pages/Show";
import FourOFour from "./pages/FourOFour";

const App = () => {
  return (
    <section>
      <NavBar />

      <Routes>
        <Route path="/">
          <Route path="transactions" index element={<Index />} />
          <Route path="transactions/:id" element={<Show />} />
          <Route path="transactions/:id/edit" element={<Edit />} />
        </Route>
        <Route path="*" element={<FourOFour />} />
      </Routes>
    </section>
  );
};

export default App;
