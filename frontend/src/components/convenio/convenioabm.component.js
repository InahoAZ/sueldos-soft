import React from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


import IconButton from '@material-ui/core/IconButton';

import TablePagination from '@material-ui/core/TablePagination';





const rows = [{ name: 'name', calories: 'uni', fat: 'hhh' }];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 540,
    },
});

export default function Convenios(props) {
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

    function deleteConvenio() {


    }

    function editarConvenio() {


    }


    function saveConvenio() {


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
                    <Typography variant="h6" style={{ margin: 10 }}>
                        Añadir nuevo
                    </Typography>


                    <Grid container
                        direction="column"
                        justifyContent="space-around"
                        alignItems="center"
                    >
                        <Grid >

                            <TextField
                                label="Nombre"
                                placeholder='11/755 Comercio'
                                style={{ width: 250, margin: 10 }}


                                variant="outlined"
                            />
                            <TextField
                                label="Fecha de Vigencia"
                                placeholder='10/10/1990'
                                style={{ width: 250, margin: 10 }}

                                variant="outlined"
                            />


                        </Grid>




                    </Grid>




                    <center>
                        <Button variant="contained" color="primary" onClick={saveConvenio} style={{ margin: 8 }}>
                            Agregar
                        </Button>
                    </center>
                    <br></br>


                    <Divider style={{ width: '100%' }}></Divider>



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
                                          
                                            <TableCell align="right">Vigencia desde</TableCell>

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
                                                    <TableCell align="center">{row.calories}</TableCell>
                                                    <TableCell align="right">

                                                        <Grid
                                                            container
                                                            direction="row"
                                                            justifyContent="flex-end"
                                                            alignItems="center"
                                                        >


                                                            <Grid>
                                                                <IconButton onClick={() => editarConvenio(row._id)}>
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Grid>
                                                            <Grid>
                                                                <IconButton color="secondary" onClick={() => deleteConvenio(row._id)}>
                                                                    <DeleteForeverIcon />
                                                                </IconButton>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
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
        </div>

    );
}