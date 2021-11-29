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

export default function SumasDescuentos(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const [rows, setRows] = React.useState([]);

    const [listaConvenios, setListaConvenios] = React.useState([]);

    const [valueTipo, setValueTipo] = React.useState('');
    const [inputTipo, setInputTipo] = React.useState('');
    const [listaTipos, setListaTipos] = React.useState(['Suma Remunerativa', 'Suma No Remunerativa', 'Descuento Remunerativo', 'Descuento No Remunerativo']);

    const [sumaRemunerativa, setSumaRemunerativa] = React.useState('');
    const [unidadMonto, setUnidadMonto] = React.useState('');


    const [valueConvenio, setConvenio] = React.useState('');
    const [inputConvenio, setInputConvenio] = React.useState('');

    const [nombre, setNombre] = React.useState('');
    const [orden, setOrden] = React.useState('');
    const [unidad, setUnidad] = React.useState('');
    const [cantidad, setCantidad] = React.useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function onChangeSumaR(e) {
        setSumaRemunerativa(e.target.value);
    }


    function onChangeNombre(e) {
        setNombre(e.target.value);
    }
    function onChangeOrden(e) {
        setOrden(e.target.value);
    }
    function onChangeUnidad(e) {
        setUnidad(e.target.value);
    }
    function onChangeCantidad(e) {
        setCantidad(e.target.value);
    }

    function addSumaRemunerativa() {

        //todo completo?
        if (orden === '' || nombre === '' || unidad === '' || cantidad === '' || inputTipo === '') {
            swal("Error!", "No deje nada vacio!", "error");
            return 0
        }

        var data = {
            orden: orden,
            name: nombre,
            unidad: unidad,
            cantidad: cantidad,
            tipo: inputTipo,

        }


        ConveniosService.addSubSumaDescuento(valueConvenio.id, data)
            .then(response => {

                console.log(response.data)

                //actualizar tabla
                listarConvenios();
                //restear todos los campos
                setConvenio('');

                setConvenio('');
                setInputConvenio('');
                setNombre('');
                setOrden('');
                setUnidad('');
                setCantidad('');

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


                    ConveniosService.deleteSubSumaDescuento(conv, data)
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

   

    function obtenerFilas(diclist) {
        console.log(diclist);

        let rows = [];
        for (let i = 0; i < diclist.length; i++) {

            if (diclist[i].sumas_descuentos) {

                for (let j = 0; j < diclist[i].sumas_descuentos.length; j++) {


                    let subC = {
                        idSumaR: diclist[i].sumas_descuentos[j]._id,
                        idConv: diclist[i]._id,
                        convenio: diclist[i].name,
                        tipo: diclist[i].sumas_descuentos[j].tipo,
                        nombre: diclist[i].sumas_descuentos[j].name,
                        unidad: diclist[i].sumas_descuentos[j].unidad,
                        cantidad: diclist[i].sumas_descuentos[j].cantidad,
                        orden: diclist[i].sumas_descuentos[j].orden,

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
                
                console.log(response.data);
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
                        Carga de Sumas/Descuentos
                    </Typography>
                    <br></br>
                    <Grid container
                        direction="column"
                        justifyContent="space-around"
                        alignItems="center"
                    >

                        <Grid container
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center" >
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
                            <Autocomplete
                                id="country-select-tipo"

                                value={valueTipo}
                                onChange={(event, newValue) => {


                                    setValueTipo(newValue);



                                }}
                                inputValue={inputTipo}
                                onInputChange={(event, newInputValue) => {

                                    setInputTipo(newInputValue);
                                }}
                                style={{ width: 250, margin: 10 }}
                                options={listaTipos}
                                classes={{
                                    option: classes.option,
                                }}
                                autoHighlight
                                getOptionLabel={(option) => option}
                                renderOption={(option) => (
                                    <React.Fragment>
                                        <span>{option}</span>

                                    </React.Fragment>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Tipo"
                                        variant="outlined"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid container
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center" >



                            <TextField
                                label="Nombre"
                                placeholder='nombre'
                                style={{ width: 250, margin: 15 }}
                                value={nombre} onChange={onChangeNombre}


                                variant="outlined"
                            />

                            <TextField
                                label="Orden"
                                placeholder='0'
                                type="number"
                                style={{ width: 250, margin: 15 }}
                                value={orden} onChange={onChangeOrden}


                                variant="outlined"
                            />

                            <TextField
                                label="Unidad"
                                placeholder='0.00'
                                type="number"
                                style={{ width: 250, margin: 15 }}
                                value={unidad} onChange={onChangeUnidad}


                                variant="outlined"
                            />

                            <TextField
                                label="Cantidad"
                                placeholder='0'
                                type="number"
                                style={{ width: 250, margin: 15 }}
                                value={cantidad} onChange={onChangeCantidad}


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
                                Lista de todos los items cargados
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
                                                <TableCell>Tipo concepto</TableCell>
                                                <TableCell align="right">nombre</TableCell>
                                                <TableCell align="right">unidad</TableCell>
                                                <TableCell align="right">cantidad</TableCell>
                                                <TableCell align="right">orden</TableCell>

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
                                                            {row.tipo}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {row.nombre}
                                                        </TableCell>
                                                        <TableCell component="th" align="right" scope="row">
                                                            {row.unidad}
                                                        </TableCell>
                                                        <TableCell component="th" align="right" scope="row">
                                                            {row.cantidad}
                                                        </TableCell>
                                                        <TableCell align="right">{row.orden}</TableCell>
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