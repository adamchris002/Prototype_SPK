import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import VendorTable from "../components/Table";
import OutlinedCard from "../components/Card";

const LandingPage = (props) => {
  const { usernameUniversal } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [vendorsData, setVendorsData] = useState([]);
  const [hasilData, setHasilData] = useState([]);
  const [checkUpdate, setCheckUpdate] = useState(true);
  const tableCondition = true;

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:3000/user/getInfo?username=${usernameUniversal}`,
      data: usernameUniversal,
    }).then((result) => {
      setUserInfo(result);
    });
  }, []);

  useEffect(() => {
    if (checkUpdate) {
      axios({
        method: "GET",
        url: "http://localhost:3000/hasil/getAllHasil",
      }).then((result) => {
        setHasilData(result.data);
        setCheckUpdate(false);
      });
    }
  }, [checkUpdate]);

  useEffect(() => {
    if (checkUpdate) {
      axios({
        method: "GET",
        url: "http://localhost:3000/vendor/getVendors",
      }).then((result) => {
        setVendorsData(result.data);
        setCheckUpdate(false);
      });
    }
  }, [checkUpdate]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          margin: "16px",
        }}
      >
        <Typography fontSize={36} fontWeight={600}>
          Welcome, {userInfo?.data.name}
        </Typography>
      </div>
      <hr style={{ margin: "16px" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "16px",
        }}
      >
        <OutlinedCard
          cardTitle={"System Used"}
          count={`${hasilData.length}`}
          description={`Times`}
        />
        <OutlinedCard cardTitle={"Users"} count={"1"} description={"Account"} />
      </div>
      <div
        style={{
          margin: "16px 120px",
          boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography fontSize={24}>List Vendor</Typography>
        <VendorTable data={vendorsData} tableCondition={tableCondition} />
      </div>
    </div>
  );
};

export default LandingPage;
