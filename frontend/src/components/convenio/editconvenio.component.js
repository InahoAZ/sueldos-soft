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
import ConveniosService from '../../services/convenio.service'
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







export default function EditarConvenio(props) {


    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [name, setStateName] = React.useState('');
    const [vigenteDesde, setStateVigenteDesde] = React.useState('');

    
    function onChangeName(e) {
        setStateName(e.target.value);
    }
    function onChangeVigenteDesde(e) {
        setStateVigenteDesde(e.target.value);
    }

    function updateConvenio() {
        let data = {
            id: props.convenioid,
            name: name,
            vigente_desde: vigenteDesde
        }
        console.log(data)
        ConveniosService.update(
            props.convenioid,
            data
        )
            .then(response => {
                console.log(response.data);
                // actualizado
                //cerrar modal
                // actualizar tabla
                props.listarConvenios()
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
                        <Grid item >
                        <TextField style={{ margin: 15 }} id="name2" label="Convenio" color="secondary" onChange={onChangeName} defaultValue={props.name} />
                        
                        <TextField style={{ margin: 15 }} id="calle" label="Fecha" color="secondary" onChange={onChangeVigenteDesde} defaultValue={props.vigenteDesde} />
                        </Grid>
                        </Grid>
                        </center>


                        
                        <br></br>
                        <center>
                        <Button variant="contained" color="primary" onClick={updateConvenio}>
                            Guardar
                        </Button>
                        </center>
                        
                    </div>
                </Fade>
            </Modal>
        </div>

    );
}







