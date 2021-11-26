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
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import swal from 'sweetalert';

import ConveniosService from '../../services/convenio.service'

import EditarCategoria from './editconvenio.component'

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 540,
    },
});



const listaCategorias = ['uno', 'dos'];


export default function Categorias(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [rows, setRows] = React.useState([]);

    const [listaConvenios, setListaConvenios] = React.useState([]);

    const [subCat, setSubCat] = React.useState('');
    const [basico, setBasico] = React.useState('');



    const [valueConvenio, setConvenio] = React.useState('');
    const [inputConvenio, setInputConvenio] = React.useState('');

    const [valueCategoria, setCategoria] = React.useState('');
    const [inputCategoria, setInputCategoria] = React.useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function onChangeBasico(e) {
        setBasico(e.target.value);
    }
    function onChangeSubCat(e) {
        setSubCat(e.target.value);
    }


    function saveSubCategoria(idCat) {
       
        var dataSubCat = {
            name: subCat,
            basico: basico,
        };
        ConveniosService.addSubCategoria(idCat, dataSubCat)
            .then(response => {

                console.log(response.data)



            })
            .catch(e => {
                console.log(e);
                swal("Error!", "No se logro cargar categoria!", "error");
            });

    }


    function addCategoria() {

        console.log('inpu' + inputCategoria);
        console.log(valueCategoria);

        var categoriaV = '';
        if (valueCategoria === inputCategoria) {
            //llamar a cargar sub categoria nomas, con id de cat 
            saveSubCategoria('5225888')
            return 0
        }


        var idConv = valueConvenio.id;
        var dataCat = {
            name: inputCategoria,
        };
        console.log(dataCat);
        ConveniosService.addCategoria(idConv, dataCat)
            .then(response => {
                console.log(response.data)

                //saveSubCategoria(id);




            })
            .catch(e => {
                console.log(e);
                swal("Error!", "No se logro cargar convenio!", "error");
            });


    }
    function deleteCategoria(num) {

        swal({
            title: "Esta seguro?",
            text: "Una vez borrado no se puede recuperar!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {


                    ConveniosService.delete(num)
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


    function listarConvenios() {
        ConveniosService.getAll()
            .then(response => {
                setRows(response.data);
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
                        Agregar nueva categoría
                    </Typography>
                    <br></br>
                    <Grid container
                        direction="column"
                        justifyContent="space-around"
                        alignItems="center"
                    >

                        <Grid item >
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-evenly"
                                alignItems="center"
                            >
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
                                    id="country-select-categoria"
                                    freeSolo
                                    value={valueCategoria}
                                    onChange={(event, newValue) => {

                                        setCategoria(newValue);

                                    }}
                                    inputValue={inputCategoria}
                                    onInputChange={(event, newInputValue) => {

                                        setInputCategoria(newInputValue);
                                    }}
                                    style={{ width: 250, margin: 10 }}
                                    options={listaCategorias}
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
                                            label="Categoria"
                                            variant="outlined"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <Grid item >

                            <TextField
                                label="Sub-Categoria"
                                placeholder='Letra'
                                style={{ width: 250, margin: 10 }}
                                onChange={onChangeSubCat}
                                value={subCat}


                                variant="outlined"
                            />
                            <TextField
                                label="Basico"
                                placeholder='1000'
                                id="outlined-start-adornment"
                                style={{ width: 250, margin: 12 }}
                                onChange={onChangeBasico}
                                value={basico}

                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                variant="outlined"
                            />



                        </Grid>


                        <center>
                            <Button variant="contained" color="primary" onClick={addCategoria} style={{ margin: 8 }}>
                                Agregar
                            </Button>
                        </center>
                        <br></br>


                        <Divider style={{ width: '100%' }}></Divider>
                        <br></br>
                        <center>
                            <Typography variant="h5" style={{ margin: 20 }}>
                                Lista de todas las categorias/subcategorias
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
                                                <TableCell>Categoria</TableCell>
                                                <TableCell>Sub-Categoría</TableCell>
                                                <TableCell align="right">Básico</TableCell>

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
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="right">{row.name}</TableCell>
                                                        <TableCell align="right">

                                                            <Grid
                                                                container
                                                                direction="row"
                                                                justifyContent="flex-end"
                                                                alignItems="center"
                                                            >


                                                                <Grid>

                                                                    <EditarCategoria
                                                                        categoriaid={row._id}
                                                                        name={row.name}
                                                                        vigenteDesde={row.name}
                                                                        listarConvenios={listarConvenios}
                                                                    />
                                                                </Grid>
                                                                <Grid>
                                                                    <IconButton color="secondary" onClick={() => deleteCategoria(row._id)}>
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
            </Grid>
        </div>

    );
}