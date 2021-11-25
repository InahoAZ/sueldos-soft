import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import swal from 'sweetalert';
import InputAdornment from '@material-ui/core/InputAdornment';
import Listaconvenios from './listaconvenios.component';
import ConvenioService from '../../services/convenio.service'

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
const listaConvenios = ['uno', 'dos'];
const listaCategorias = ['uno', 'dos'];
const listaSubcategoria = ['uno', 'dos'];
export default function CrearEmpresa() {
  const childRef = useRef();

  const [valueConvenio, setConvenio] = React.useState('');
  const [inputConvenio, setInputConvenio] = React.useState('');

  const [valueCategoria, setCategoria] = React.useState('');
  const [inputCategoria, setInputCategoria] = React.useState('');

  const [valueSubcategoria, setValueSubcategoria] = React.useState('');
  const [inputSubcategoria, setInputSubcategoria] = React.useState('');


  function ver(que) {
    console.log(que);
  }
  function saveConvenio() {
    var data = {
      name: 'nose - 7676',
      vigente_desde: '02/02/2020',
    };
    console.log(data);
    ConvenioService.create(data)
      .then(response => {

        var idConv = response.data.data._id;
        var dataCat = {
          name: 'catego',
        };
        ConvenioService.addCategoria(idConv, dataCat)
          .then(response => {



          })
          .catch(e => {
            console.log(e);
            swal("Error!", "No se logro cargar categoria!", "error");
          });



      })
      .catch(e => {
        console.log(e);
        swal("Error!", "No se logro cargar convenio!", "error");
      });
  }

  /*
    function saveEmpresa() {
     
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
  */

  const classes = useStyles();
  return (
    <Grid
      container
      xs={12}
      direction="column"
      alignItems="center"
    >

      <Grid

        xs={8}
        direction="column"
        alignItems="flex-start"
      >




        <Grid item>

          <Typography variant="h5" >
            Gestionar convenios
          </Typography>


        </Grid>

        <br></br>
        <Divider></Divider>
        <br></br>
        <Typography variant="h6" >
          Agregar:
        </Typography>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Autocomplete
                id="country-select-convenio"
                freeSolo
                value={valueConvenio}
                onChange={(event, newValue) => {

                  setConvenio(newValue);

                }}
                inputValue={inputConvenio}
                onInputChange={(event, newInputValue) => {

                  setInputConvenio(newInputValue);
                }}
                style={{ width: 250, margin: 15 }}
                options={listaConvenios}
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
                    label="Convenio"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              <TextField
                label="Fecha de Vigencia"
                placeholder='10/10/1990'
                style={{ width: 250, margin: 12, marginLeft: 12 }}
                className={clsx(classes.margin, classes.textField)}

                variant="outlined"
              />
            </Grid>

          </Grid>

          <Grid item >
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
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
                style={{ width: 250, margin: 15 }}
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
              <Autocomplete
                id="country-select-subcategoria"
                freeSolo
                value={valueSubcategoria}
                onChange={(event, newValue) => {

                  setValueSubcategoria(newValue);

                }}
                inputValue={inputSubcategoria}
                onInputChange={(event, newInputValue) => {

                  setInputSubcategoria(newInputValue);
                }}
                style={{ width: 250, margin: 15 }}
                options={listaSubcategoria}
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
                    label="Sub-Categoria"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              <TextField
                label="Basico"
                placeholder='1000'
                id="outlined-start-adornment"
                style={{ width: 250, margin: 12, marginLeft: 12 }}
                className={clsx(classes.margin, classes.textField)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>





        </Grid>
        <br></br>
        <Divider></Divider>
        <center>
          <Button variant="contained" color="primary" onClick={saveConvenio} style={{ margin: 8 }}>
            Agregar
          </Button>
        </center>
        <br></br>
        <Grid item>
          <Listaconvenios ref={childRef} />

        </Grid>
      </Grid>

    </Grid>
  );





}

