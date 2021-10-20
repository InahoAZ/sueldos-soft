import React from 'react';
import Grid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Listarpuestos from './listarpuestos.component'
import Select from '@material-ui/core/Select';
import PuestoService from '../../services/puesto.service'
import Divider from '@material-ui/core/Divider';
import swal from 'sweetalert';
import EmpresaService from '../../services/empresa.service'
import InputLabel from '@material-ui/core/InputLabel';
import AreaService from '../../services/area.service'
import DepartamentoService from '../../services/departamento.service'


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));




export default function CrearPuesto() {

  let child = React.createRef();
  const [departamentos, setdepartamentos] = React.useState([]);

  const [areas, setareas] = React.useState([]);

  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    async function retrieveEmpresasauto() {
      EmpresaService.getAll()
        .then(response => {
          setOptions(response.data)

        })
        .catch(e => {
          console.log(e);
        });
    }
    retrieveEmpresasauto();
  }, []);

  let state2 = {
    id: 'null',
    name: "",
  };

  function onChangeName(e) {

    state2.name = e.target.value

  }

  function obtenerAreas(empresas) {
    console.log(empresas);
    let areas = [];
    for (let i = 0;i<this.empresas.length;i++){
      
      if (this.empresas[i].areas && this.empresas[i].id === stateempresa.idempresa){
        
        for (let j = 0;j<this.empresas[i].areas.length;j++){
          
          
                  let area = {
                    id: this.empresas[i].areas[j].id,
                    name: this.empresas[i].areas[j].name,
                    
                  }
                  areas.push(area)
                
        }
      }
    }



    return areas
  }

  function cargarAreas() {
    AreaService.getAll()
      .then(response => {
        setareas(obtenerAreas(response.data))
        setStatearea({
          ...statearea,
          idarea: '',
        });


      })
      .catch(e => {
        console.log(e);
      });
  }
  function cargarDepartamentos() {
    DepartamentoService.getAll()
      .then(response => {
        setdepartamentos(response.data)
        setStatedepartamento({
          ...statedepartamento,
          iddepartamento: '',
        });


      })
      .catch(e => {
        console.log(e);
      });
  }





  const classes = useStyles();
  const [stateempresa, setStateempresa] = React.useState({
    idempresa: '',
    name: '',
  });

  const handleChangeempresa = (event) => {
    if (event.target.value != '') {
      cargarAreas()
    }
    const name = event.target.name;
    setStateempresa({
      ...stateempresa,
      [name]: event.target.value,
    });
    //console.log(state)
  };
  const [statearea, setStatearea] = React.useState({
    idarea: '',
    name: '',
  });

  const handleChangearea = (event) => {
    if (event.target.value != '') {
      cargarDepartamentos()
    }
    const name = event.target.name;
    setStatearea({
      ...statearea,
      [name]: event.target.value,
    });
    //console.log(state)
  };
  const [statedepartamento, setStatedepartamento] = React.useState({
    iddepartamento: '',
    name: '',
  });

  const handleChangedepartamento = (event) => {
    const name = event.target.name;
    setStatedepartamento({
      ...statedepartamento,
      [name]: event.target.value,
    });
    //console.log(state)
  };
  function savePuesto() {
    var data = {
      name: state2.name,
      iddepartamento: statedepartamento.iddepartamento,
    };

    PuestoService.create(data)
      .then(response => {

        console.log(response.data);
        child.current.refreshList();
        // borrar text del selec

        setStateempresa({
          ...stateempresa,
          idempresa: '',
        });
        setStatearea({
          ...statearea,
          idarea: '',
        });
        setStatedepartamento({
          ...statedepartamento,
          iddepartamento: '',
        });

        document.getElementById("puestonombre").value = '';

        swal("Correcto!", "Se agrego con exito a la tabla!", "success");

      })
      .catch(e => {
        console.log(e);
        swal("Error!", "No se logro cargarlo!", "error");
      });
  }



  return (



    <Grid
      container
      xs={12}
      direction="column"
      alignItems="center"
    >

      <Grid

        xs={7}
        direction="column"
        alignItems="flex-start"
      >




        <Grid item>

          <Typography variant="h5" >
            Crear Puesto
          </Typography>

          <TextField id="puestonombre" label="Nombre del puesto" color="secondary" onChange={onChangeName} style={{ marginTop: '8px' }} />
    <br></br>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Empresa</InputLabel>
            <Select
              native
              value={stateempresa.idempresa}
              onChange={handleChangeempresa}
              inputProps={{
                name: 'idempresa',
                id: 'age-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              {options.map((option) => (
                <option value={option.id}>{option.name}</option>
              ))}

            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Area</InputLabel>
            <Select
              native
              value={statearea.idarea}
              onChange={handleChangearea}
              inputProps={{
                name: 'idarea',
                id: 'age-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              {areas.map((option) => (
                <option value={option.id}>{option.name}</option>
              ))}

            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Departamento</InputLabel>
            <Select
              native
              value={statedepartamento.iddepartamento}
              onChange={handleChangedepartamento}
              inputProps={{
                name: 'iddepartamento',
                id: 'age-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              {departamentos.map((option) => (
                <option value={option.id}>{option.name}</option>
              ))}

            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={savePuesto} style={{ marginTop: '20px', marginLeft: '20px' }} >
            Crear
          </Button>

        </Grid>
        <br></br>
        <Divider></Divider>
        <br></br>
        <Grid item>
          <Listarpuestos ref={child} />
        </Grid>
      </Grid>

    </Grid>
  );





}

