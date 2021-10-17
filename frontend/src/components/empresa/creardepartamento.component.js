import React from 'react';
import Grid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Listardepartamentos from './listardepartamento.component'
import Select from '@material-ui/core/Select';
import DepartamentoService from '../../services/departamento.service'
import Divider from '@material-ui/core/Divider';
import swal from 'sweetalert';
import EmpresaService from '../../services/empresa.service'
import InputLabel from '@material-ui/core/InputLabel';
import AreaService from '../../services/area.service'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));




export default function CrearDepartamento() {
  
  let child = React.createRef();
  const [areas, setareas] = React.useState([]);

  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    async function retrieveEmpresasauto() {
      EmpresaService.getAll()
        .then(response => {
          setOptions( response.data)
          
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
 
 function cargarAreas(){
  AreaService.getAll()
  .then(response => {
    setareas( response.data)
    setStatearea({
      ...statearea,
      idarea: '',
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
    const name = event.target.name;
    setStatearea({
      ...statearea,
      [name]: event.target.value,
    });
    //console.log(state)
  };
  function saveDepartamento() {
    var data = {
      name: state2.name,
      idarea: statearea.idarea,
    };
   
    DepartamentoService.create(data)
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
    
        document.getElementById("departamentonombre").value='';
        
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
          Crear Departamento
        </Typography>
   
        <TextField id="departamentonombre" label="Nombre del departamento" color="secondary" onChange={onChangeName} style={{marginTop: '8px'}}/>
        
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
        <Button variant="contained" color="primary" onClick={saveDepartamento} style={{marginTop: '20px', marginLeft:'20px'}} >
          Crear
        </Button>
        
      </Grid>
      <br></br>
      <Divider></Divider>
      <br></br>
      <Grid item>
        <Listardepartamentos ref={child}/>
      </Grid>
    </Grid>

    </Grid>
    );

  



}
 
