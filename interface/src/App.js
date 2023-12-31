import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import { useState } from "react";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import ResponsiveAppBar from "./components/Navbar";
import CountPage from "./pages/CountPage";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  const [openLoginPage, setOpenLoginPage] = useState(true);
  const [usernameUniversal, setUsernameUniversal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route
            path="/"
            element={
              <Login
                openLoginPage={openLoginPage}
                setOpenLoginPage={setOpenLoginPage}
                setUsernameUniversal={setUsernameUniversal}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/register"
            element={<Register openLoginPage={openLoginPage} />}
          />

          <Route
            path="/home"
            element={
              isLoggedIn ? (
                <LandingPage
                  usernameUniversal={usernameUniversal}
                  isLoggedIn={isLoggedIn}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/dms"
            element={
              isLoggedIn ? (
                <CountPage isLoggedIn={isLoggedIn} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
