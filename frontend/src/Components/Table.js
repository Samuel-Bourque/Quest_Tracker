import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(nom, lvl, complete) {
  return { nom, lvl, complete };
}

const rows = [createData("Chef's Assistant", 1, "Compléter")];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom de quête</TableCell>
            <TableCell align="right">Niveau</TableCell>
            <TableCell align="right">compléter?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.nom}>
              <TableCell component="th" scope="row">
                {row.nom}
              </TableCell>
              <TableCell align="right">{row.lvl}</TableCell>
              <TableCell align="right">
                <Button variant="outlined" color="dark">
                  {row.complete}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
