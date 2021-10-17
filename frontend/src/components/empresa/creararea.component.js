import React from 'react';
import Grid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Listarareas from './listarareas.component'
import Select from '@material-ui/core/Select';
import AreaService from '../../services/area.service'
import Divider from '@material-ui/core/Divider';
import swal from 'sweetalert';
import EmpresaService from '../../services/empresa.service'
import InputLabel from '@material-ui/core/InputLabel';



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));




export default function CrearArea() {
  
  let child = React.createRef();

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
 
 
 

 


  const classes = useStyles();
  const [state, setState] = React.useState({
    idempresa: '',
    name: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
    //console.log(state)
  };
  function saveArea() {
    var data = {
      name: state2.name,
      idempresa: state.idempresa,
    };
   
    AreaService.create(data)
      .then(response => {
        
        console.log(response.data);
        child.current.refreshList();
        // borrar text del selec

        setState({
          ...state,
          idempresa: '',
        });
        document.getElementById("areanombre").value='';
        
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
          Crear Area
        </Typography>
   
        <TextField id="areanombre" label="Nombre del area" color="secondary" onChange={onChangeName} style={{marginTop: '8px'}}/>
        
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Empresa</InputLabel>
        <Select
          native
          value={state.idempresa}
          onChange={handleChange}
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
        <Button variant="contained" color="primary" onClick={saveArea} style={{marginTop: '20px', marginLeft:'20px'}} >
          Crear
        </Button>
        
      </Grid>
      <br></br>
      <Divider></Divider>
      <br></br>
      <Grid item>
        <Listarareas ref={child}/>
      </Grid>
    </Grid>

    </Grid>
    );

  



}
 
