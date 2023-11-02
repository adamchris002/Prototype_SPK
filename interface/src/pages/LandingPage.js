import { Backdrop, Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import VendorTable from "../components/Table";
import OutlinedCard from "../components/Card";
import VendorModal from "../components/Modal";

const LandingPage = (props) => {
  const { usernameUniversal } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [vendorsData, setVendorsData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [tableCondition, setTableCondition] = useState(true);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  //for vendor data
  const [namaVendor, setNamaVendor] = useState("");
  const [hargaVendor, setHargaVendor] = useState(null);
  const [kualitasBahan, setKualitasBahan] = useState(null);
  const [modelSeragam, setModelSeragam] = useState(null);
  const [waktuPengerjaan, setWaktuPengerjaan] = useState(null);
  const [kualitasProduk, setKualitasProduk] = useState(null);
  const [tempoPembayaran, setTempoPembayaran] = useState(null);
  const [checkUpdate, setCheckUpdate] = useState(true);
  const [updateRowId, setUpdateRowId] = useState(null);

  const [updateRowData, setUpdateRowData] = useState(false);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:3000/user/getInfo?username=${usernameUniversal}`,
      data: usernameUniversal,
    }).then((result) => {
      setCheckUpdate(false);
      setUserInfo(result);
    });
  }, []);

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

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setNamaVendor("");
    setHargaVendor("");
    setKualitasBahan("");
    setModelSeragam("");
    setWaktuPengerjaan("");
    setKualitasProduk("");
    setTempoPembayaran("");
    setUpdateRowData(null)
    setUpdateRowId(null);
    setOpenModal(false);
  };

  const handleAddNewVendor = () => {
    const newData = {
      name: namaVendor,
      price: hargaVendor,
      kualitas_bahan: kualitasBahan,
      model_seragam: modelSeragam,
      waktu_pengerjaan: waktuPengerjaan,
      kualitas_produk: kualitasProduk,
      tempo_pembayaran: tempoPembayaran,
    };
    axios({
      method: "POST",
      url: "http://localhost:3000/vendor/addVendor",
      data: newData,
    }).then(() => {
      setNamaVendor("");
      setHargaVendor("");
      setKualitasBahan("");
      setModelSeragam("");
      setWaktuPengerjaan("");
      setKualitasProduk("");
      setTempoPembayaran("");
      setCheckUpdate(true);
      setOpenModal(false);
    });
  };

  const handleDeleteVendor = (id) => {
    axios({
      method: "DELETE",
      url: `http://localhost:3000/vendor/deleteVendor/${id}`,
    }).then(() => {
      setCheckUpdate(true);
    });
  };

  const handleUpdateVendor = () => {
    const newDatas = {
      name: namaVendor,
      price: hargaVendor,
      kualitas_bahan: kualitasBahan,
      model_seragam: modelSeragam,
      waktu_pengerjaan: waktuPengerjaan,
      kualitas_produk: kualitasProduk,
      tempo_pembayaran: tempoPembayaran,
    };
    axios({
      method: "PUT",
      url: `http://localhost:3000/vendor/updateVendor/${updateRowId}`,
      data: newDatas,
    }).then(() => {
      setNamaVendor("");
      setHargaVendor("");
      setKualitasBahan("");
      setModelSeragam("");
      setWaktuPengerjaan("");
      setKualitasProduk("");
      setTempoPembayaran("");
      setCheckUpdate(true);
      setOpenModal(false);
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          margin: "16px",
        }}
      >
        <Typography fontSize={24} fontWeight={600}>
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
          count={"1"}
          description={`Times`}
        />
        <OutlinedCard cardTitle={"Users"} count={"1"} description={"Account"} />
      </div>
      <div
        style={{
          margin: "16px 120px",boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)"
        }}
      >
        <VendorTable
          data={vendorsData}
          handleDeleteVendor={handleDeleteVendor}
          setUpdateRowData={setUpdateRowData}
          handleOpenModal={handleOpenModal}
          setNamaVendor={setNamaVendor}
          setHargaVendor={setHargaVendor}
          setKualitasBahan={setKualitasBahan}
          setModelSeragam={setModelSeragam}
          setWaktuPengerjaan={setWaktuPengerjaan}
          setKualitasProduk={setKualitasProduk}
          setTempoPembayaran={setTempoPembayaran}
          setUpdateRowId={setUpdateRowId}
          tableCondition={tableCondition}
        />
      </div>
      <VendorModal
        openModal={openModal}
        namaVendor={namaVendor}
        setNamaVendor={setNamaVendor}
        hargaVendor={hargaVendor}
        setHargaVendor={setHargaVendor}
        kualitasBahan={kualitasBahan}
        setKualitasBahan={setKualitasBahan}
        modelSeragam={modelSeragam}
        setModelSeragam={setModelSeragam}
        waktuPengerjaan={waktuPengerjaan}
        setWaktuPengerjaan={setWaktuPengerjaan}
        kualitasProduk={kualitasProduk}
        setKualitasProduk={setKualitasProduk}
        tempoPembayaran={tempoPembayaran}
        setTempoPembayaran={setTempoPembayaran}
        handleCloseModal={handleCloseModal}
        handleAddNewVendor={handleAddNewVendor}
        openUpdateModal={openUpdateModal}
        setOpenUpdateModal={setOpenUpdateModal}
        updateRowData={updateRowData}
        setUpdateRowData={setUpdateRowData}
        handleUpdateVendor={handleUpdateVendor}
        updateRowId={updateRowId}
      />
    </div>
  );
};

export default LandingPage;
