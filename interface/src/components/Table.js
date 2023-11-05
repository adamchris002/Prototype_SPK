import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Paper from "@mui/material/Paper";

import { visuallyHidden } from "@mui/utils";
import { IconButton, Pagination } from "@mui/material";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Nama",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Harga",
  },
  {
    id: "kualitas_bahan",
    numeric: true,
    disablePadding: false,
    label: "Kualitas Bahan",
  },
  {
    id: "model_seragam",
    numeric: true,
    disablePadding: false,
    label: "Model Seragam",
  },
  {
    id: "waktu_pengerjaan",
    numeric: true,
    disablePadding: false,
    label: "Waktu Pengerjaan",
  },
  {
    id: "kualitas_produk",
    numeric: true,
    disablePadding: false,
    label: "Kualitas Produk",
  },
  {
    id: "tempo_pembayaran",
    numeric: true,
    disablePadding: false,
    label: "Tempo Pembayaran",
  },
];

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort, tableCondition } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {tableCondition ? "" : <TableCell>Action</TableCell>}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTable = (props) => {
  const {
    data,
    handleDeleteVendor,
    setNamaVendor,
    setHargaVendor,
    setKualitasBahan,
    setModelSeragam,
    setWaktuPengerjaan,
    setKualitasProduk,
    setTempoPembayaran,
    setUpdateRowData,
    setUpdateRowId,
    handleOpenModal,
    tableCondition,
  } = props;

  // console.log(data)

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(data.length / (tableCondition ? 5 : 3));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const startIndex = page * (tableCondition ? 5 : 3);
  const endIndex = startIndex + (tableCondition ? 5 : 3);
  const visibleRows = React.useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        startIndex,
        endIndex
      ),
    [data, order, orderBy, startIndex, endIndex]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              tableCondition={tableCondition}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.kualitas_bahan}</TableCell>
                    <TableCell align="right">{row.model_seragam}</TableCell>
                    <TableCell align="right">{row.waktu_pengerjaan}</TableCell>
                    <TableCell align="right">{row.kualitas_produk}</TableCell>
                    <TableCell align="right">{row.tempo_pembayaran}</TableCell>
                    {tableCondition ? (
                      ""
                    ) : (
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            handleDeleteVendor(row.id);
                          }}
                        >
                          <DeleteIcon sx={{ color: "red" }} />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setNamaVendor(row.name);
                            setHargaVendor(row.price);
                            setKualitasBahan(row.kualitas_bahan);
                            setModelSeragam(row.model_seragam);
                            setWaktuPengerjaan(row.waktu_pengerjaan);
                            setKualitasProduk(row.kualitas_produk);
                            setTempoPembayaran(row.tempo_pembayaran);
                            setUpdateRowId(row.id);
                            setUpdateRowData(true);
                            handleOpenModal(true);
                          }}
                        >
                          <EditIcon sx={{ color: "blue" }} />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 2 }}>
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={(event, newPage) => {
              setPage(newPage - 1);
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default EnhancedTable;
