import React from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TablePagination from '@material-ui/core/TablePagination';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Button from '@material-ui/core/Button';

const rows = [{ name: 'name', calories: 'uni', fat: 'hhh' }];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 540,
    },
});

export default function SumasRemunerativas(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    function addSumaRemunerativa() {


    }
    function deleteSuma() {


    }
    return (

        <div>
            <Grid
                container

                direction="column"
                alignItems="center"
            >

                <Grid item


                    container
                    direction="column"
                    alignItems="center"
                >
                    <Typography variant="h5" style={{ margin: 20 }}>
                        Carga de sumas remunerativas
                    </Typography>
                    <br></br>
                    <Grid container
                        direction="column"
                        justifyContent="space-around"
                        alignItems="center"
                    >

                        <Grid item >
                            <TextField
                                label="Convenio"
                                placeholder='seleccione convenio'
                                style={{ width: 250, margin: 10 }}


                                variant="outlined"
                            />
                        </Grid>

                        <Grid item >



                            <TextField
                                label="Suma remunerativa"
                                placeholder='nombre'
                                style={{ width: 250, margin: 10 }}


                                variant="outlined"
                            />
                            <TextField
                                label="Unidad"
                                placeholder=''
                                style={{ width: 200, margin: 10 }}

                                variant="outlined"
                            />



                        </Grid>
                 

                        <center>
                        <Button variant="contained" color="primary" onClick={addSumaRemunerativa} style={{ margin: 8 }}>
                            Agregar
                        </Button>
                    </center>
                    <br></br>

               
                    <Divider style={{width:'100%'}}></Divider>
                    <br></br>
                    <center>
                    <Typography variant="h5" style={{ margin: 20 }}>
                        Lista de todas las sumas remunerativas cargadas
                    </Typography>
                    </center>
                    <br></br>


                        <Grid item>



                            <Paper className={classes.root}>
                                <TableContainer className={classes.container}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                            <TableCell>Convenios</TableCell>
                                                <TableCell>Suma remunerativa</TableCell>
                                                <TableCell align="right">Unidad</TableCell>

                                                <TableCell align="right">Opciones</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="right">{row.calories}</TableCell>
                                                        <TableCell align="right"><IconButton color="secondary" onClick={() => deleteSuma(row._id)}>
                                                            <DeleteForeverIcon />
                                                        </IconButton></TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 100]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>




                        </Grid>


                    </Grid>




                </Grid>
            </Grid>
        </div>

    );
}