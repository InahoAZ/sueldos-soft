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
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import ConveniosService from '../../services/convenio.service'
import swal from 'sweetalert';



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


    const [rows, setRows] = React.useState([]);

    const [listaConvenios, setListaConvenios] = React.useState([]);

    const [sumaRemunerativa, setSumaRemunerativa] = React.useState('');
    const [unidadMonto, setUnidadMonto] = React.useState('');


    const [valueConvenio, setConvenio] = React.useState('');
    const [inputConvenio, setInputConvenio] = React.useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    function addSumaRemunerativa() {

        //todo completo?
        if (sumaRemunerativa === '' || unidadMonto === '' || inputConvenio === '') {
            swal("Error!", "No deje nada vacio!", "error");
            return 0
        }

        var data = {
            name: sumaRemunerativa,
            monto: unidadMonto

        }


        ConveniosService.addSubSumaR(valueConvenio.id, data)
            .then(response => {

                console.log(response.data)

                //actualizar tabla
                listarConvenios();
                //restear todos los campos
                setConvenio('');
                setSumaRemunerativa('');
                setUnidadMonto('');

                swal("Correcto!", "Se agrego con exito!", "success");

            })
            .catch(e => {
                console.log(e);
                swal("Error!", "No se logro cargar categoria!", "error");
            });


    }
    function deleteSuma(suma, conv) {
    
        var data = {
            idSum: suma,
        }
console.log(data);
        swal({
            title: "Esta seguro?",
            text: "Una vez borrado no se puede recuperar!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {


                    ConveniosService.deleteSubSumaR(conv, data)
                        .then(response => {
                            console.log(response.data);
                            //eliminado correctamente msj
                            swal("Se ha borrado!", {
                                icon: "success",
                            });
                            //actualizar tabla
                            listarConvenios()
                        })
                        .catch(e => {
                            console.log(e);
                            swal("Error!", "no se logro borrar", "error");
                        });



                } else {
                    swal("Cancelado!");
                }
            });


    }

    function onlyConvenios(data) {
        let listdic = [];
        let dic = {};

        for (let i = 0; i < data.length; i++) {
            dic = {
                id: data[i]._id,
                name: data[i].name
            }
            listdic.push(dic)
        }
        return listdic
    }

    function onChangeSumaR(e) {
        setSumaRemunerativa(e.target.value);
    }
    function onChangeUnidadM(e) {
        setUnidadMonto(e.target.value);
    }


    function obtenerFilas(diclist) {
        console.log(diclist);

        let rows = [];
        for (let i = 0; i < diclist.length; i++) {

            if (diclist[i].sumas_remunerativas) {

                for (let j = 0; j < diclist[i].sumas_remunerativas.length; j++) {


                    let subC = {
                        idSumaR: diclist[i].sumas_remunerativas[j]._id,
                        idConv: diclist[i]._id,
                        convenio: diclist[i].name,
                        sumaRemunerativa: diclist[i].sumas_remunerativas[j].name,
                        unidad: diclist[i].sumas_remunerativas[j].monto,
                       
                    }
                    rows.push(subC)


                }

            }
        }



        return rows
    }


    function listarConvenios() {
        ConveniosService.getAll()
            .then(response => {
                setRows(obtenerFilas(response.data));
                setListaConvenios(onlyConvenios(response.data))
                //setTotalConveniosDic(response.data);
                //console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    React.useEffect(() => {
        async function autoListaStart() {
            listarConvenios()
        }
        autoListaStart();
    }, []);






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
                            <Autocomplete
                                id="country-select-convenio"

                                value={valueConvenio}
                                onChange={(event, newValue) => {


                                    setConvenio(newValue);



                                }}
                                inputValue={inputConvenio}
                                onInputChange={(event, newInputValue) => {

                                    setInputConvenio(newInputValue);
                                }}
                                style={{ width: 250, margin: 10 }}
                                options={listaConvenios}
                                classes={{
                                    option: classes.option,
                                }}
                                autoHighlight
                                getOptionLabel={(option) => option.name}
                                renderOption={(option) => (
                                    <React.Fragment>
                                        <span>{option.name}</span>

                                    </React.Fragment>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Convenio"
                                        variant="outlined"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item >



                            <TextField
                                label="Suma remunerativa"
                                placeholder='nombre'
                                style={{ width: 250, margin: 10 }}
                                value={sumaRemunerativa} onChange={onChangeSumaR}


                                variant="outlined"
                            />
                            <TextField
                                label="Unidad"
                                placeholder=''
                                style={{ width: 200, margin: 10 }}
                                value={unidadMonto} onChange={onChangeUnidadM}

                                variant="outlined"
                            />



                        </Grid>


                        <center>
                            <Button variant="contained" color="primary" onClick={addSumaRemunerativa} style={{ margin: 8 }}>
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
                                                            {row.convenio}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {row.sumaRemunerativa}
                                                        </TableCell>
                                                        <TableCell align="right">{row.unidad}</TableCell>
                                                        <TableCell align="right"><IconButton color="secondary" onClick={() => deleteSuma(row.idSumaR, row.idConv)}>
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