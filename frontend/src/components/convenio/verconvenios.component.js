import React from 'react';

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


export default function VerConvenios(props) {
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

    function deleteConvenio(){


    }

    function editarConvenio(){

        
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
                    alignItems="flex-start"
                >
                    <Typography variant="h5" style={{ margin: 20 }}>
                        Lista de todos los convenios cargados
                    </Typography>
                    <br></br>



                    <Paper className={classes.root}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
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
                                                <TableCell align="right">{row.calories}</TableCell>
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
        </div>

    );
}