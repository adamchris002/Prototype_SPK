import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const VendorTable = (props) => {
  const { data } = props;
  console.log(data);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, backgroundColor: "#Edeeee" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Kualitas Bahan</TableCell>
            <TableCell align="right">Model Seragam</TableCell>
            <TableCell align="right">Waktu Pengerjaan</TableCell>
            <TableCell align="right">Kualitas Produk</TableCell>
            <TableCell align="right">Tempo Pembayaran</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <TableRow
              key={data.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {data.name}
              </TableCell>
              <TableCell align="right">{data.price}</TableCell>
              <TableCell align="right">{data.kualitas_bahan}</TableCell>
              <TableCell align="right">{data.model_seragam}</TableCell>
              <TableCell align="right">{data.waktu_pengerjaan}</TableCell>
              <TableCell align="right">{data.kualitas_produk}</TableCell>
              <TableCell align="right">{data.tempo_pembayaran}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VendorTable;
