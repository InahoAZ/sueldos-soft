import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Listaempresas from './listaempresa.component'

import EmpresaService from '../../services/empresa.service'
import Divider from '@material-ui/core/Divider';
import swal from 'sweetalert';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function CrearEmpresa() {
  const childRef = useRef();

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
  });



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
  function onChangeCalle(e) {
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



  function saveEmpresa() {
    var data = {
      name: state.name,
      tipo: state.tipo,
      cuit: state.cuit,
      direccion: state.calle,
      telefono: state.telefono,
      web: state.web,
    };
    console.log(data);
    EmpresaService.create(data)
      .then(response => {
        setState({
          id: null,
          name: '',
          tipo: "",
          telefono: '',
          web: '',
          cuit: '',
          provincia: "",
          localidad: '',
          codigoPostal: '',
          calle: '',
        });
        console.log(response.data);
        childRef.current.refreshList();
        // borrar text
        document.getElementById("empresanombre").value = '';
        //msj cargado exitosament
        swal("Correcto!", "Se agrego con exito a la tabla!", "success");

      })
      .catch(e => {
        console.log(e);
        swal("Error!", "No se logro cargarlo!", "error");
      });
  }


  const classes = useStyles();
  return (
    <Grid
      container
      xs={12}
      direction="column"
      alignItems="center"
    >

      <Grid

        xs={12}
        sm={11}
        md={10}
        lg={8}
        xl={6}
        direction="column"
        alignItems="flex-start"
      >




        <Grid item>

          <Typography variant="h5" >
            Crear empresa
          </Typography>
          <br></br>
          <Grid
            container
            alignItems="center"
            justifyContent="center">
            <TextField style={{ margin: 15 }} id="empresanombre" value={state.name} label="Nombre de empresa" color="secondary" onChange={onChangeName} />
            <TextField style={{ margin: 15 }} id="cuit" label="CUIT" value={state.cuit} color="secondary" onChange={onChangeCuit} />
            <TextField style={{ margin: 15 }} id="telefono" label="Telefono" value={state.telefono} color="secondary" onChange={onChangeTelefono} />
            <TextField style={{ margin: 15 }} id="web" label="Web" value={state.web} color="secondary" onChange={onChangeWeb} />
            <TextField style={{ margin: 15 }} id="tipo" label="tipo" value={state.tipo} color="secondary" onChange={onChangeTipo} />


            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="default" component="span" style={{ marginTop: 20 }}>
                Logo / imagen
              </Button>
            </label>


          </Grid>

        </Grid>

        <br></br>
        <Divider></Divider>
        <br></br>
        <Typography variant="h6" >
          Dirección:
        </Typography>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
        >


          <TextField style={{ margin: 5 }} id="provincia" label="Provincia" color="secondary" onChange={onChangeProvincia} />
          <TextField style={{ margin: 5 }} id="localidad" label="Localidad" color="secondary" onChange={onChangeLocalidad} />
          <TextField style={{ margin: 5 }} id="codigoPostal" label="Codigo postal" color="secondary" onChange={onChangeCodigoPostal} />
          <TextField style={{ margin: 5 }} id="calle" value={state.calle} label="Calle y numero" color="secondary" onChange={onChangeCalle} />


        </Grid>
        <br></br>
        <Divider></Divider>
        <center>
          <Button variant="contained" color="primary" onClick={saveEmpresa} style={{ margin: 8 }}>
            Crear
          </Button>
        </center>
        <br></br>
        <Grid item>
          <Listaempresas ref={childRef} />
        </Grid>
      </Grid>

    </Grid>
  );





}

