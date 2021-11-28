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
import EmpresaService from '../../services/empresa.service'
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';


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
}));







export default function EditarEmpresa(props) {


    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [state, setState] = React.useState({
        id: null,
        name: "",
        tipo: "",
        telefono: '',
        web: '',
        cuit: '',
        provincia: "",
        localidad: '',
        codigoPostal: '',
        calle: '',
        pais: '',
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let data = {
        id: props.empresaid,
        name: '',
        tipo: '',
        telefono: '',
        web: '',
        provincia: '',
        codigoPostal: '',
        calleNumero: '',
        localidad: '',
    }
    function onChangeName(e) {
        setState({
            ...state,
            name: e.target.value,
        });
    }

    function onChangeCuit(e) {
        setState({
            ...state,
            cuit: e.target.value
        });
    }
    function onChangeTelefono(e) {
        setState({
            ...state,
            telefono: e.target.value
        });
    }
    function onChangeWeb(e) {
        setState({
            ...state,
            web: e.target.value
        });
    }
    function onChangeTipo(e) {
        setState({
            ...state,
            tipo: e.target.value
        });
    }
    function onChangeProvincia(e) {
        setState({
            ...state,
            provincia: e.target.value
        });
    }

    function onChangeLocalidad(e) {
        setState({
            ...state,
            localidad: e.target.value
        });
    }
    function onChangeCalleNumero(e) {
        setState({
            ...state,
            calle: e.target.value
        });
    }
    function onChangeCodigoPostal(e) {
        setState({
            ...state,
            codigoPostal: e.target.value
        });
    }
    function onChangePais(e) {
        setState({
            ...state,
            pais: e.target.value
        });
    }

    function updateEmpresa() {
        console.log(data)

        var data = {
            name: state.name,
            tipo: state.tipo,
            //cuit: state.cuit,
            //pais: state.pais,
            provincia: state.provincia,
            localidad: state.localidad,
            codigoPostal: state.codigoPostal,
            calleNumero: state.calle,
            telefono: state.telefono,
            web: state.web,
        };
        EmpresaService.update(
            props.empresaid,
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
                        <br></br>
                        <center>
                            <Grid container xs={10}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item xs={6}>
                                    <TextField style={{ margin: 15 }} id="name2" label="Nombre de empresa" color="secondary" onChange={onChangeName} defaultValue={props.empresa[0].name} />
                                    <TextField style={{ margin: 15 }} id="telefono" label="Telefono" color="secondary" onChange={onChangeTelefono} defaultValue={props.empresa[0].telefono} />
                                    <TextField style={{ margin: 15 }} id="provincia" label="Provincia" color="secondary" onChange={onChangeProvincia} defaultValue={props.empresa[0].provincia} />
                                    <TextField style={{ margin: 15 }} id="codigoPostal" label="Codigo postal" color="secondary" onChange={onChangeCodigoPostal} defaultValue={props.empresa[0].codigoPostal} />

                                </Grid>
                                <Grid item xs={6}>
                                    <TextField style={{ margin: 15 }} id="tipo" label="Tipo de empresa" color="secondary" onChange={onChangeTipo} defaultValue={props.empresa[0].tipo} />
                                    <TextField style={{ margin: 15 }} id="web" label="Web" color="secondary" onChange={onChangeWeb} defaultValue={props.empresa[0].web} />
                                    <TextField style={{ margin: 15 }} id="localidad" label="Localidad" color="secondary" onChange={onChangeLocalidad} defaultValue={props.empresa[0].localidad} />
                                    <TextField style={{ margin: 15 }} id="calle" label="Calle" color="secondary" onChange={onChangeCalleNumero} defaultValue={props.empresa[0].calleNumero} />
                                </Grid>
                            </Grid>
                        </center>



                        <br></br>
                        <center>
                            <Button variant="contained" color="primary" onClick={updateEmpresa}>
                                Guardar
                            </Button>
                        </center>

                    </div>
                </Fade>
            </Modal>
        </div>

    );
}







