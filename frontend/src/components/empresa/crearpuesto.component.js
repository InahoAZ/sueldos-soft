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
import ConveniosService from '../../services/convenio.service'

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
function getCatbyConvId(id){
  if(id !== ''){
    for(let i = 0 ;i<convenios.length;i++){

      if(id === convenios[i]._id){

        setCategorias(convenios[i].categorias);
      }
    }

  }else{
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

function getSubCatbyConvId(id){
  if(id !== ''){
    for(let i = 0 ;i<categorias.length;i++){

      if(id === categorias[i]._id){

        setSubCategorias(categorias[i].subcategorias);
      }
    }

  }else{
    
    setSubCategorias([]);
    setSubCategoriasSelect('');

  }
}

function handleChangeSubCategoria(e){
  setSubCategoriasSelect(e.target.value);

}


  React.useEffect(() => {
    async function retrieveEmpresasauto() {
      obtenerData();
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

  function obtenerData (){
    ConveniosService.getAll()
    .then(response => {
        setConvenios(response.data);
        console.log(response.data);
    })
    .catch(e => {
        console.log(e);
    });

  }

  const [state2, setState2] = React.useState({
    id: 'null',
    name: "",
  });

  function onChangeName(e) {

    setState2({
      id: 'null',
      name: e.target.value,
    })

  }

 

  function obtenerAreas(empresas, id) {
    console.log(empresas);
    let rows = [];
    for (let i = 0; i < empresas.length; i++) {

      if (empresas[i].areas && empresas[i]._id === id) {

        for (let j = 0; j < empresas[i].areas.length; j++) {


          let area = {
            id: empresas[i].areas[j]._id,
            name: empresas[i].areas[j].name,

          }
          rows.push(area)

        }
      }
    }



    return rows
  }

  function cargarAreas(id) {
    EmpresaService.getAll()
      .then(response => {
        setareas(obtenerAreas(response.data, id))
        setStatearea({
          ...statearea,
          idarea: '',
        });


      })
      .catch(e => {
        console.log(e);
      });
  }
  function obtenerDepartamentos(empresas, idarea) {
    console.log(empresas);
    let rows = [];
    for (let i = 0; i < empresas.length; i++) {

      if (empresas[i].areas) {

        for (let j = 0; j < empresas[i].areas.length; j++) {

          if (empresas[i].areas[j].departamentos && empresas[i].areas[j]._id === idarea) {

            for (let d = 0; d < empresas[i].areas[j].departamentos.length; d++) {



              let depa = {
                id: empresas[i].areas[j].departamentos[d]._id,
                name: empresas[i].areas[j].departamentos[d].name,

                areaname: empresas[i].areas[j].name,
                empresaname: empresas[i].name,
              }
              rows.push(depa)


            }
          }
        }
      }
    }



    return rows
  }
  function cargarDepartamentos(id) {
    EmpresaService.getAll()
      .then(response => {
        setdepartamentos(obtenerDepartamentos(response.data, id))
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
    if (event.target.value !== '') {
      cargarAreas(event.target.value)
    }
    const name = event.target.name;
    setStateempresa({
      ...stateempresa,
      [name]: event.target.value,
    });
    setStatearea({
      ...statearea,
      idarea: '',
    });

    setStatedepartamento({
      ...statedepartamento,
      iddepartamento: '',
    });
    //console.log(state)
  };
  const [statearea, setStatearea] = React.useState({
    idarea: '',
    name: '',
  });

  const handleChangearea = (event) => {
    if (event.target.value !== '') {
      cargarDepartamentos(event.target.value)
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


    if (setSubCategoriasSelect === '' || state2.name === '' || statedepartamento.iddepartamento === ''){
      swal("Error!", "No deje campos vacios!", "error");
      return 0
    }





    var data = {
      name: state2.name,
      idDepartamento: statedepartamento.iddepartamento,

      idSubCategoriaConv: subCategoriasSelect,
      idConvenio: conveniosSelect,
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
        setState2({
          id: 'null',
          name: '',
        });

        setareas([]);
        setdepartamentos([]);

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
            Crear Puesto
          </Typography>

          <TextField id="puestonombre" label="Nombre del puesto" color="secondary" value={state2.name} onChange={onChangeName} style={{ marginTop: '8px' }} />
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
                <option value={option._id}>{option.name}</option>
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

