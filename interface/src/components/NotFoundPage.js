import React from "react";
import { Button, Typography } from "@mui/material";
import pageNotFound from "../assets/3747371.jpg";
import { useNavigate } from "react-router-dom";

const NotFoundPage = (props) => {
  const { isLoggedIn } = props;
  const navigate = useNavigate();
  return (
    <div>
      {isLoggedIn && (
        <>
          <div
            style={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <Typography style={{ color: "#adadad" }} fontSize={24}>
                Sorry, the page you are looking for could not be found. Please
                check the URL or navigate back to the homepage.
              </Typography>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  style={{ height: "400px", width: "500px" }}
                  src={pageNotFound}
                  alt={"route not found"}
                />
              </div>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/home");
                }}
              >
                Navigate back to home?
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotFoundPage;
