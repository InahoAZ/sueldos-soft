import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name,  id) {
  return { name, id };
}

const rows = [
  createData('CamporaSA',  6867565656),
  createData('MilenialCorp',  6867565656),
  createData('Compumundo',  6867565656),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <Grid   container
    direction="column"
    justifyContent="center"
    alignItems="center">
        <Grid
        xs={8}
        
         container
         direction="row"
         justifyContent="space-between"
         alignItems="center"
        >
        <Grid>
        <Typography variant="h5" style={{ padding: 20 }}>
                Areas
              </Typography>
        </Grid>
        
        </Grid>
        
    <Grid>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
           
            <TableCell align="right">Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
          
              <TableCell align="right">
                
                <EditIcon/>
                <DeleteForeverIcon/>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>


    
    </Grid>
    
  );
}