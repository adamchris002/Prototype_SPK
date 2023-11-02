import { Backdrop, Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

const VendorModal = (props) => {
  const {
    openModal,
    namaVendor,
    setNamaVendor,
    hargaVendor,
    setHargaVendor,
    kualitasBahan,
    setKualitasBahan,
    modelSeragam,
    setModelSeragam,
    waktuPengerjaan,
    setWaktuPengerjaan,
    kualitasProduk,
    setKualitasProduk,
    tempoPembayaran,
    setTempoPembayaran,
    handleCloseModal,
    handleAddNewVendor,
    updateRowData,

    handleUpdateVendor
  } = props;

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openModal}
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            border: "2px solid #000",
            boxShadow: 24,
            backgroundColor: "#444444",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {updateRowData ? "Update Vendor" : "Add New Vendor"}
          </Typography>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "16px",
            }}
          >
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Nama:
            </Typography>
            <TextField
              value={namaVendor}
              onChange={(event) => {
                setNamaVendor(event.target.value);
              }}
              size="small"
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Harga:
            </Typography>
            <TextField
              value={hargaVendor}
              onChange={(event) => {
                setHargaVendor(event.target.value);
              }}
              type="number"
              size="small"
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Kualitas Bahan:
            </Typography>
            <TextField
              value={kualitasBahan}
              onChange={(event) => {
                setKualitasBahan(event.target.value);
              }}
              type="number"
              size="small"
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Model Seragam:
            </Typography>
            <TextField
              value={modelSeragam}
              onChange={(event) => {
                setModelSeragam(event.target.value);
              }}
              type="number"
              size="small"
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Waktu Pengerjaan:
            </Typography>
            <TextField
              value={waktuPengerjaan}
              onChange={(event) => {
                setWaktuPengerjaan(event.target.value);
              }}
              type="number"
              size="small"
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Kualitas Produk:
            </Typography>
            <TextField
              value={kualitasProduk}
              onChange={(event) => {
                setKualitasProduk(event.target.value);
              }}
              type="number"
              size="small"
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Tempo Pembayaran:
            </Typography>
            <TextField
              value={tempoPembayaran}
              onChange={(event) => {
                setTempoPembayaran(event.target.value);
              }}
              type="number"
              size="small"
            />
          </Box>
          <Button
            onClick={
              updateRowData
                ? () => {
                    handleUpdateVendor();
                  }
                : () => {
                    handleAddNewVendor();
                  }
            }
            disabled={
              namaVendor === "" ||
              hargaVendor === null ||
              hargaVendor === "" ||
              kualitasBahan === null ||
              kualitasBahan === "" ||
              modelSeragam === null ||
              modelSeragam === "" ||
              waktuPengerjaan === null ||
              waktuPengerjaan === "" ||
              kualitasProduk === null ||
              kualitasProduk === "" ||
              tempoPembayaran === null ||
              tempoPembayaran === ""
                ? true
                : false
            }
            variant="contained"
            color="success"
          >
            {updateRowData ? "Update Vendor" : "Add New Vendor"}
          </Button>
          <Button
            onClick={() => {
              handleCloseModal();
            }}
            sx={{ marginLeft: "16px" }}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
        </Box>
      </Backdrop>
      
    </div>
  );
};

export default VendorModal;
