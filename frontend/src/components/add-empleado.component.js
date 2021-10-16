import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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

export default function TransitionsModal() {
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
      
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Nuevo empleado
      </Button>
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
            <h2 id="transition-modal-title">Información básica</h2>
            <Grid container
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}>
           
            <Grid item >
            <TextField  id="outlined-search" label="CUIL" type="search" variant="outlined" />
            <TextField id="outlined-search" label="Apellido" type="search" variant="outlined" />
            <TextField id="outlined-search" label="Nombre" type="search" variant="outlined" />
            </Grid>

            <Grid item >
            <TextField  id="outlined-search" label="Nacionalidad" type="search" variant="outlined" />
            <TextField id="outlined-search" label="Estado civil" type="search" variant="outlined" />
            <TextField id="outlined-search" label="Fecha de nacimiento" type="search" variant="outlined" />
            </Grid>

            <Grid item >
            <TextField  id="outlined-search" label="Telefono" type="search" variant="outlined" />
            <TextField id="outlined-search" label="Correo electronico" type="search" variant="outlined" />
            <TextField id="outlined-search" label="Direccion" type="search" variant="outlined" />
            </Grid>


           
            <Grid item  >
            <TextField id="outlined-search" label="Departamento" type="search" variant="outlined" />
            
            <TextField id="outlined-search" label="Puesto" type="search" variant="outlined" />
            </Grid>

            
            <Button variant="contained" color="primary" >
        Cargar empleado
      </Button>

            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
