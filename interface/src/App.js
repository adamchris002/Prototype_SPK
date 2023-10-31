import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { useState } from "react";
import Register from "./pages/Register";

function App() {
  const [openLoginPage, setOpenLoginPage] = useState(true);
  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Login openLoginPage={openLoginPage} setOpenLoginPage={setOpenLoginPage}/>} />
          <Route path="/register" element={<Register openLoginPage={openLoginPage} />} />
          {/* <Route path="/" element={<LandingPage />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
