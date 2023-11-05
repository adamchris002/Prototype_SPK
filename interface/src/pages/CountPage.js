import axios from "axios";
import React, { useEffect, useState } from "react";
import VendorTable from "../components/Table";
import VendorModal from "../components/Modal";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

const CountPage = (props) => {
  const [vendorsData, setVendorsData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
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

  //for criteria weight
  const [bobotHarga, setBobotHarga] = useState(null);
  const [bobotBahan, setBobotBahan] = useState(null);
  const [bobotModel, setBobotModel] = useState(null);
  const [bobotWaktu, setBobotWaktu] = useState(null);
  const [bobotKualitas, setBobotKualitas] = useState(null);
  const [bobotTempo, setBobotTempo] = useState(null);
  const [finalSawResult, setFinalSawResult] = useState([]);
  const [listHasilPerhitungan, setListHasilPerhitungan] = useState([]);
  const [disableWeight, setDisableWeight] = useState(false);
  const [hasilNormalisasi, setHasilNormalisasi] = useState([]);

  //for alert
  const [popupMessage, setPopupMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState(false);
  const [popupCondition, setPopupCondition] = useState(false);

  //for result table
  const [resultTableData, setResultTableData] = useState([]);

  useEffect(() => {
    if (checkUpdate) {
      axios({
        method: "GET",
        url: "http://localhost:3000/hasil/getAllHasil",
      }).then((result) => {
        setResultTableData(result.data);
        setCheckUpdate(false);
      });
    }
  }, [checkUpdate]);

  const calculateTotalBobot = () => {
    const totalBobot =
      parseFloat(bobotHarga) +
      parseFloat(bobotBahan) +
      parseFloat(bobotModel) +
      parseFloat(bobotWaktu) +
      parseFloat(bobotKualitas) +
      parseFloat(bobotTempo);

    return totalBobot;
  };

  const handleCloseAlert = () => {
    setPopupMessage("");
    setPopupCondition(false);
    setMessageStatus(false);
  };

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
    setUpdateRowData(null);
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
      setPopupCondition(true);
      setMessageStatus(true);
      setPopupMessage("You have successfully created an account!");
    });
  };

  const handleDeleteVendor = (id) => {
    axios({
      method: "DELETE",
      url: `http://localhost:3000/vendor/deleteVendor/${id}`,
    }).then(() => {
      setCheckUpdate(true);
      setPopupCondition(true);
      setMessageStatus(true);
      setPopupMessage("You have successfully deleted an account!");
    });
  };

  const handleCountNormalisasi = () => {
    let result = [];
    let minHarga = Infinity;
    let minWaktu = Infinity;
    let maxBahan = -Infinity;
    let maxProduk = -Infinity;
    let maxTempo = -Infinity;
    let maxModel = -Infinity;

    // Find min harga and min waktu
    vendorsData.forEach((item) => {
      minHarga = Math.min(minHarga, item.price);
      minWaktu = Math.min(minWaktu, item.waktu_pengerjaan);
    });

    vendorsData.forEach((item) => {
      maxBahan = Math.max(maxBahan, item.kualitas_bahan);
      maxProduk = Math.max(maxProduk, item.kualitas_produk);
      maxModel = Math.max(maxModel, item.model_seragam);
      maxTempo = Math.max(maxTempo, item.tempo_pembayaran);
    });

    // Divide values based on specified formulas
    vendorsData.forEach((item) => {
      let obj = {};
      Object.keys(item).forEach((key) => {
        if (key === "id") {
          obj[key] = item[key];
        } else if (key === "name") {
          obj[key] = item[key];
        } else if (key === "createdAt") {
          obj[key] = item[key];
        } else if (key === "updatedAt") {
          obj[key] = item[key];
        } else if (key === "price") {
          obj[key] = minHarga / item[key];
        } else if (key === "waktu_pengerjaan") {
          obj[key] = minWaktu / item[key];
        } else if (key === "kualitas_bahan") {
          obj[key] = item[key] / maxBahan;
        } else if (key === "model_seragam") {
          obj[key] = item[key] / maxModel;
        } else if (key === "kualitas_produk") {
          obj[key] = item[key] / maxProduk;
        } else if (key === "tempo_pembayaran") {
          obj[key] = item[key] / maxTempo;
        }
      });
      result.push(obj);
    });
    return setHasilNormalisasi(result);
  };

  const handleSaveAndCountResult = () => {
    const allCountResult = [];
    const finalResult = [];
    hasilNormalisasi.forEach((result) => {
      const data = {
        vendorName: result.name,
        countHarga: (result.price * bobotHarga) / 100,
        countBahan: (result.kualitas_bahan * bobotBahan) / 100,
        countKualitas: (result.kualitas_produk * bobotKualitas) / 100,
        countModel: (result.model_seragam * bobotModel) / 100,
        countWaktu: (result.waktu_pengerjaan * bobotWaktu) / 100,
        countTempo: (result.tempo_pembayaran * bobotTempo) / 100,
      };
      allCountResult.push(data);
    });
    handleCountFinalResult(finalResult, allCountResult);
    const highestValueObject = finalResult.reduce(
      (max, obj) => (obj.value > max.value ? obj : max),
      finalResult[0]
    );

    handlePostHasil(highestValueObject);

    return setFinalSawResult(highestValueObject);
  };

  const handlePostHasil = (highestValueObject) => {
    let dataHasil = {
      name: highestValueObject.name,
      nilai_tertinggi: highestValueObject.value,
    };
    axios({
      method: "POST",
      url: "http://localhost:3000/hasil/addHasil",
      data: dataHasil,
    }).then((result) => {});
  };

  const handleCountFinalResult = (finalResult, allCountResult) => {
    allCountResult.forEach((result) => {
      const data = {
        name: result.vendorName,
        value:
          result.countHarga +
          result.countBahan +
          result.countKualitas +
          result.countModel +
          result.countTempo +
          result.countWaktu,
      };
      finalResult.push(data);
    });
    console.log(allCountResult);
    setListHasilPerhitungan(finalResult);
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
          maxWidth: "100vw",
        }}
      >
        <Typography fontSize={36} fontWeight={600}>
          Sistem Rekomendasi Vendor
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          margin: "16px",
        }}
      >
        <Typography fontSize={20} fontWeight={400}>
          Sistem digunakan sebagai alat rekomendasi pembuatan sistem untuk
        </Typography>
      </div>
      <hr style={{ margin: "16px" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          margin: "16px",
        }}
      >
        <div
          style={{
            boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
            width: "50vw",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "16px 100px",
            }}
          >
            <Typography fontSize={32} fontWeight={400}>
              LIST VENDOR
            </Typography>
          </div>

          <div
            style={{
              margin: "24px 16px",
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
            />
          </div>
          <div style={{ margin: "16px" }}>
            <Button
              onClick={() => {
                handleOpenModal();
              }}
              variant="contained"
            >
              Add new Vendor
            </Button>
          </div>
        </div>
        <div
          style={{
            margin: "0px 16px 0px 32px",
            boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
            width: "50vw",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "16px",
            }}
          >
            <Typography fontSize={32} fontWeight={400}>
              Bobot
            </Typography>
          </div>
          <Box
            style={{
              height: 490,
              margin: "16px auto",
              width: 450,
              // border: "2px solid #000",

              borderRadius: "5px",
              padding: "16px",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {"Masukkan Bobot Sesuai Kriteria"}
              </Typography>
              <IconButton
                disabled={!disableWeight}
                style={{ marginLeft: "16px" }}
                onClick={() => {
                  setDisableWeight(false);
                }}
              >
                <EditIcon sx={{ color: !disableWeight ? "grey" : "blue" }} />
              </IconButton>
            </Box>
            <Typography>{"(Jumlah bobot memiliki jumlah 100%)"}</Typography>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "16px",
              }}
            >
              <Typography id="modal-modal-description">Harga:</Typography>
              <TextField
                disabled={disableWeight ? true : false}
                value={bobotHarga}
                onChange={(event) => {
                  setBobotHarga(event.target.value);
                }}
                type="number"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "16px",
              }}
            >
              <Typography id="modal-modal-description">
                Kualitas Bahan:
              </Typography>
              <TextField
                disabled={disableWeight ? true : false}
                value={bobotBahan}
                onChange={(event) => {
                  setBobotBahan(event.target.value);
                }}
                type="number"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "16px",
              }}
            >
              <Typography id="modal-modal-description">
                Model Seragam:
              </Typography>
              <TextField
                disabled={disableWeight ? true : false}
                value={bobotModel}
                onChange={(event) => {
                  setBobotModel(event.target.value);
                }}
                type="number"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "16px",
              }}
            >
              <Typography id="modal-modal-description">
                Waktu Pengerjaan:
              </Typography>
              <TextField
                disabled={disableWeight ? true : false}
                value={bobotWaktu}
                onChange={(event) => {
                  setBobotWaktu(event.target.value);
                }}
                type="number"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "16px",
              }}
            >
              <Typography id="modal-modal-description">
                Kualitas Produk:
              </Typography>
              <TextField
                disabled={disableWeight ? true : false}
                value={bobotKualitas}
                onChange={(event) => {
                  setBobotKualitas(event.target.value);
                }}
                type="number"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "16px",
              }}
            >
              <Typography id="modal-modal-description">
                Tempo Pembayaran:
              </Typography>
              <TextField
                disabled={disableWeight ? true : false}
                value={bobotTempo}
                onChange={(event) => {
                  setBobotTempo(event.target.value);
                }}
                type="number"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
              />
            </Box>
            <div
              style={{
                height: "20%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={() => {
                  if (vendorsData.length <= 3) {
                    setMessageStatus(false);
                    setPopupMessage("Please fill in at least 3 vendors");
                    setPopupCondition(true);
                  } else {
                    setDisableWeight(true);
                    handleCountNormalisasi();
                  }
                }}
                variant="contained"
                disabled={
                  bobotHarga === null ||
                  bobotBahan === null ||
                  bobotModel === null ||
                  bobotWaktu === null ||
                  bobotKualitas === null ||
                  bobotTempo === null ||
                  bobotHarga === "" ||
                  bobotBahan === "" ||
                  bobotModel === "" ||
                  bobotWaktu === "" ||
                  bobotKualitas === "" ||
                  bobotTempo === "" ||
                  calculateTotalBobot() !== 100 ||
                  disableWeight !== false
                    ? true
                    : false
                }
              >
                SAVE
              </Button>
            </div>
          </Box>
        </div>
      </div>
      <Button
        disabled={hasilNormalisasi.length === 0 ? true : false}
        style={{ height: "40%", marginTop: "16px" }}
        onClick={() => {
          handleSaveAndCountResult();
          setCheckUpdate(true);
        }}
        variant="contained"
      >
        Count Result
      </Button>
      {finalSawResult.length !== 0 ? (
        <div
          style={{
            margin: "16px auto",
            width: 450,
            padding: "12px",
            justifyContent: "center",
            borderRadius: "10px",
            boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "16px",
              }}
            >
              <Typography fontSize={16} fontWeight={400}>
                Rekomendasi Utama
              </Typography>
              <Typography fontSize={16} fontWeight={400}>
                Hasil Skor
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "8px",
              }}
            >
              <Typography fontSize={24} fontWeight={600}>
                {finalSawResult?.name}
              </Typography>
              <Typography fontSize={24} fontWeight={600}>
                {finalSawResult?.value}
              </Typography>
            </div>
          </div>
          <hr />
          <div style={{ margin: "16px" }}>
            <Typography fontWeight={600} fontSize={24}>
              Data Perhitungan
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontWeight={600}>No</Typography>
              <Typography fontWeight={600}>Name</Typography>
              <Typography fontWeight={600}>Result</Typography>
            </div>
            <div>
              {listHasilPerhitungan.map((result, index) => {
                return (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>{`${index}. `}</Typography>
                    <Typography>{result.name}</Typography>
                    <Typography>
                      {parseFloat(result.value.toFixed(2))}
                    </Typography>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          margin: "16px",
        }}
      >
        <Typography fontSize={28} fontWeight={600}>
          History Perhitungan
        </Typography>
      </div>
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          margin: "16px",
        }}
      >
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resultTableData.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.nilai_tertinggi}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
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
    </div>
  );
};

export default CountPage;
