import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import {
  Alert,
  Button,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openLoginPage, setOpenLoginPage } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupCondition, setPopupCondition] = useState(false);
  const [messageStatus, setMessageStatus] = useState(false);

  useEffect(() => {
    const message = location.state && location.state.message;
    if (message) {
      setPopupMessage(message);
      setMessageStatus(true);
      setPopupCondition(true);
    }
  }, [location.state]);

  const handleLogin = () => {
    const loginData = { username: username, password: password };
    if (username === "" || password === "") {
      setPopupMessage("Please fill in all the required fields");
      setMessageStatus(false);
      setPopupCondition(true);
    } else {
      axios({
        method: "POST",
        url: "http://localhost:3000/user/login",
        data: loginData,
      }).then(() => {
        setOpenLoginPage(false);
      });
    }
  };

  const handleCloseAlert = () => {
    setPopupMessage("");
    setPopupCondition(false);
    setMessageStatus(false);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoginPage}
        onClick={() => {}}
      >
        <div
          style={{
            width: "400px",
            height: "400px",
            display: "flex",
            justifyContent: "center",
            background: "white",
            borderRadius: "20px",
          }}
        >
          <div style={{ padding: "16px", width: "100%" }}>
            <Typography sx={{ color: "black" }} fontSize={36} fontWeight={500}>
              Logins
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: "16px",
              }}
            >
              <Typography sx={{ color: "black" }}>Username:</Typography>
              <TextField
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                size="small"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: "16px",
              }}
            >
              <Typography sx={{ color: "black" }}>Password:</Typography>
              <TextField
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                size="small"
              />
            </div>
            <div
              style={{ marginTop: "16px", cursor: "pointer" }}
              onClick={() => {
                navigate("/register");
              }}
            >
              <Link>Don't have an account? Click here to register!</Link>
            </div>
            <div
              style={{
                height: "40%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <div>
                <Button
                  onClick={() => {
                    handleLogin();
                  }}
                  variant="contained"
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
        {popupMessage !== ("" || null) && (
          <Snackbar
            open={popupCondition}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
          >
            <Alert
              onClose={handleCloseAlert}
              severity={messageStatus ? "success" : "error"}
              sx={{ width: "100%" }}
            >
              {popupMessage}
            </Alert>
          </Snackbar>
        )}
      </Backdrop>
    </div>
  );
};

export default Login;
