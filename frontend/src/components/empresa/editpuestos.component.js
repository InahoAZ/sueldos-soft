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
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import PuestoService from '../../services/puesto.service'
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';
import ConveniosService from '../../services/convenio.service'
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));







export default function EditarPuesto(props) {


    const classes = useStyles();
    const [open, setOpen] = React.useState(false);



    const [subCategorias, setSubCategorias] = React.useState([]);
    const [categorias, setCategorias] = React.useState([]);
    const [convenios, setConvenios] = React.useState([]);

    const [subCategoriasSelect, setSubCategoriasSelect] = React.useState('');
    const [categoriasSelect, setCategoriasSelect] = React.useState('');
    const [conveniosSelect, setConveniosSelect] = React.useState('');

    function handleChangeConvenio(e) {
        setConveniosSelect(e.target.value);
        getCatbyConvId(e.target.value)
        setSubCategoriasSelect('');

        setCategoriasSelect('');
    }


    React.useEffect(() => {
        async function start() {
            obtenerData();

        }
        start();
    }, []);
    function getCatbyConvId(id) {
        console.log(id)
        console.log(convenios)
        if (id !== '') {
            for (let i = 0; i < convenios.length; i++) {

                if (id === convenios[i]._id) {

                    setCategorias(convenios[i].categorias);
                }
            }

        } else {
            setCategorias([]);
            setSubCategorias([]);
            setSubCategoriasSelect('');

            setCategoriasSelect('');

        }
    }

    function handleChangeCategoria(e) {

        setCategoriasSelect(e.target.value);
        getSubCatbyConvId(e.target.value);
        setSubCategoriasSelect('');
    }

    function getSubCatbyConvId(id) {
        if (id !== '') {
            for (let i = 0; i < categorias.length; i++) {

                if (id === categorias[i]._id) {

                    setSubCategorias(categorias[i].subcategorias);
                }
            }

        } else {

            setSubCategorias([]);
            setSubCategoriasSelect('');

        }
    }

    function handleChangeSubCategoria(e) {
        setSubCategoriasSelect(e.target.value);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let data = {
        id: props.puestoid,
        name: ''
    }
    function onChangeName(e) {
        data.name = e.target.value
    }

    function updatePuesto() {
        console.log(data)
        PuestoService.update(
            props.puestoid,
            data
        )
            .then(response => {
                console.log(response.data);
                // actualizado
                //cerrar modal
                // actualizar tabla
                props.refreshList()
                swal("Correcto!", "Se actualizo con exito!", "success");
                handleClose()
            })
            .catch(e => {
                console.log(e);
                swal("Error!", "No se logro actualizarlo!", "error");
            });
    };

    React.useEffect(() => {
        if (convenios.length > 0) {
          console.log(convenios);

          getCatbyConvId(props.idConvenio);
          setCategoriasSelect(props.idCat);
        }
      }, [convenios]);

      React.useEffect(() => {
        if (categorias.length > 0) {
          getSubCatbyConvId(props.idCat)
          setSubCategoriasSelect(props.idSub);
        }
      }, [categorias]);


    function obtenerData() {
        ConveniosService.getAll()
            .then(response => {

                setConvenios(response.data);
                setConveniosSelect(props.idConvenio);


                


                
            })
            .catch(e => {
                console.log(e);
            });

    }




    return (

        <div>
            <IconButton color="primary" onClick={handleOpen}>
                <EditIcon />
            </IconButton>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h3 id="transition-modal-title">Editar </h3>
                        <TextField id="name2" label="Nombre del puesto" color="secondary" onChange={onChangeName} defaultValue={props.puestoname} />
                        <br></br>


                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-native-simple">Convenio</InputLabel>
                            <Select
                                native
                                value={conveniosSelect}
                                onChange={handleChangeConvenio}
                                inputProps={{
                                    name: 'name',
                                    id: 'id',
                                }}
                            >
                                <option aria-label="None" value="" />
                                {convenios.map((option) => (
                                    <option value={option._id}>{option.name}</option>
                                ))}

                            </Select>
                        </FormControl>
                        <br></br>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-native-simple">Categoria</InputLabel>
                            <Select
                                native
                                value={categoriasSelect}
                                onChange={handleChangeCategoria}
                                inputProps={{
                                    name: 'name',
                                    id: 'id',
                                }}
                            >
                                <option aria-label="None" value="" />
                                {categorias.map((option) => (
                                    <option value={option._id}>{option.name}</option>
                                ))}

                            </Select>
                        </FormControl>
                        <br></br>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-native-simple">Sub-Categoria</InputLabel>
                            <Select
                                native
                                value={subCategoriasSelect}
                                onChange={handleChangeSubCategoria}
                                inputProps={{
                                    name: 'name',
                                    id: 'id',
                                }}
                            >
                                <option aria-label="None" value="" />
                                {subCategorias.map((option) => (
                                    <option value={option._id}>{option.name}</option>
                                ))}

                            </Select>
                        </FormControl>


                        <br></br>
                        <br></br>
                        <Button variant="contained" color="primary" onClick={updatePuesto}>
                            Guardar
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </div>

    );
}







