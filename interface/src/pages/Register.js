import {
  Alert,
  Backdrop,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = (props) => {
  const navigate = useNavigate();
  const { setSuccessMessage } = useAuth();
  const { openLoginPage } = props;
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupCondition, setPopupCondition] = useState(false);

  const handleRegister = () => {
    const registerData = {
      name: name,
      username: username,
      password: password,
      email: email,
    };
    if (name === "" || username === "" || password === "" || email === "") {
      setPopupMessage("Please fill in all the required fields");
      setPopupCondition(true);
    } else {
      axios({
        method: "POST",
        url: "http://localhost:3000/user/register",
        data: registerData,
      })
        .then((result) => {
          if (result.status === 200) {
            setSuccessMessage("Yay, you have successfully created an account!");
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.response) {
            popupCondition(true);
            setPopupMessage(error.response.data.error);
          }
        });
    }
  };

  const handleCloseAlert = () => {
    setPopupCondition(false);
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
              Register
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "16px",
              }}
            >
              <Typography sx={{ color: "black" }}>Name:</Typography>
              <TextField
                onChange={(event) => {
                  setName(event.target.value);
                }}
                size="small"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "16px",
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
                justifyContent: "space-between",
                alignItems: "center",
                margin: "16px",
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
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "16px",
              }}
            >
              <Typography sx={{ color: "black" }}>Email:</Typography>
              <TextField
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                size="small"
              />
            </div>
            <div
              style={{ margin: "16px", cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
            >
              <Link>Already have an account? Click here to sign in!</Link>
            </div>
            <div
              style={{
                height: "10%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <div>
                <Button
                  onClick={() => {
                    handleRegister();
                  }}
                  variant="contained"
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Snackbar
          open={popupCondition}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="error"
            sx={{ width: "100%" }}
          >
            {popupMessage}
          </Alert>
        </Snackbar>
      </Backdrop>
    </div>
  );
};

export default Register;
