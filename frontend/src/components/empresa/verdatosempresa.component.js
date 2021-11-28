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

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


 




    return (

        <div>
            <IconButton  onClick={handleOpen}>
                <VisibilityIcon />
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
                        <h3 id="transition-modal-title">Datos de la empresa: #cuit </h3>
                        <br></br>
                        <Grid container>
                        <Grid item xs={6}>
                        <h6 >Nombre:  </h6>
                        <h5  >{props.empresa[0].name} </h5>
                        <br></br>
                        
                        <h6 >Telefono:  </h6>
                        <h5  >{props.empresa[0].telefono} </h5>
                        <br></br>
                        <h6 >Direccion:  </h6>
                        <h5  >{props.empresa[0].pais}</h5>
                        <h5  >{props.empresa[0].provincia}</h5>
                        <h5  >{props.empresa[0].localidad}</h5>
                        <h5  >{props.empresa[0].calleNumero}</h5>
                        
                        </Grid>
                        <Grid item xs={6}>
                        <h6 >Tipo:  </h6>
                        <h5  >{props.empresa[0].tipo} </h5>
                        <br></br>
                        <h6 >Web:  </h6>
                        <h5  >{props.empresa[0].web} </h5>
                        <br></br>
                        <h6 >Logo:  </h6>
                        <img src='https://picsum.photos/70/70' />
                        </Grid>
                        </Grid>
                        
                        
                       
                       
                        <center>
                        <Button variant="contained"  onClick={handleClose}>
                            Cerrar
                        </Button>
                        </center>
                       
                    </div>
                </Fade>
            </Modal>
        </div>

    );
}







