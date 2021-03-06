import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Sueldo Básico', 159, 6.0, 24, 4.0),
    createData('Jubilación - Ley 24.241', 237, 9.0, 37, 4.3),
    createData('Ley 19.032 - INSSJP', 262, 16.0, 24, 6.0),
    createData('Obra social', 305, 3.7, 67, 4.3),
    createData('Sindicato ', 356, 16.0, 49, 3.9),
  ];


export default function Sueldos(props) {

    const classes = useStyles();


    return (
        <div>

            <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow style={{backgroundColor:'rgb(174 173 191)'}}>
            <TableCell>CONCEPTOS</TableCell>
            <TableCell align="right">BASE</TableCell>
            <TableCell align="right">UNIDAD</TableCell>
            <TableCell align="right">HABERES</TableCell>
            <TableCell align="right">DESCUENTOS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        </div>
    );

}
