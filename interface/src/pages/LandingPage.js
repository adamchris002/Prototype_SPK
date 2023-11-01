import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EnhancedTable from "../components/Table";
import OutlinedCard from "../components/Card";

const LandingPage = (props) => {
  const { usernameUniversal } = props;
  const [userInfo, setUserInfo] = useState(null);
  console.log(userInfo);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:3000/user/getInfo?username=${usernameUniversal}`,
      data: usernameUniversal,
    }).then((result) => {
      setUserInfo(result);
    });
  }, []);

  return (
    <div>
      <div style={{display: "flex", justifyContent: "flex-start", margin: "16px"}}>
        <Typography fontSize={36} fontWeight={600}>Welcome, {userInfo?.data.name}</Typography>
      </div>
      <hr style={{margin: "16px"}}/>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "16px",
        }}
      >
        <OutlinedCard></OutlinedCard>
        <OutlinedCard></OutlinedCard>
      </div>
      <div
      style={{
        margin: "16px",
      }}>
        <EnhancedTable />
      </div>
     
    </div>
  );
};

export default LandingPage;
