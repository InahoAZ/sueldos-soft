import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import swal from 'sweetalert';
import PuestosAsignados from './tablapuestosasignados.component';
import EmpleadoService from '../services/empleados.service';
import EmpresaService from '../services/empresa.service';
import Select from '@material-ui/core/Select';
import EmpleadosService from '../services/empleados.service';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Complete los campos de acuerdo a la informacion basica de la persona.', 'Asigne el puesto que desempeñara.'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Verifique que la informacion es correcta antes de continuar';
    case 1:
      return 'Antes de finalizar, revise los campos seleccionados';
    default:
      return 'error';
  }
}


export default function Datos(props) {
  const mode = props.estado;
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [puestos, setpuestos] = React.useState([]);
  const [departamentos, setdepartamentos] = React.useState([]);

  const [areas, setareas] = React.useState([]);
  const [options, setOptions] = React.useState([]);

  

  const handleNext = () => {

    saveEmpleado()
    //setActiveStep((prevActiveStep) => prevActiveStep + 1);


  };
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
  React.useEffect(() => {
    async function traerDatos() {
      if (mode === 'editar') {

        //obtener cuil / id
        console.log('cuil: ' + props.cuil);
        //obtener datos de ese empleado - rellenarlo
        EmpleadosService.getOne(props.cuil)
          .then(response => {
            console.log(response.data)
            // set todos con valores
            setCuil(response.data.cuil);
            setApellido(response.data.apellido);
            setNombre(response.data.nombre);
            setLegajo(response.data.legajo);

            setNacimiento(response.data.fechaNacimiento);
            setNacionalidad(response.data.nacionalidad);
            setEstadocivil(response.data.estadoCivil);

            setTelefono(response.data.telefono);
            setCorreo(response.data.correo);
            setDireccion(response.data.direccion);

          })
          .catch(e => {
            console.log(e);
          });



      }

    }
    traerDatos();
  }, []);



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

  function obtenerAreas(empresas) {
    console.log(empresas);
    let areas = [];
    for (let i = 0; i < this.empresas.length; i++) {

      if (this.empresas[i].areas && this.empresas[i].id === stateempresa.idempresa) {

        for (let j = 0; j < this.empresas[i].areas.length; j++) {


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



  function obtenerPuestos(empresas, iddepartamento) {
    console.log(empresas);
    let rows = [];
    for (let i = 0; i < empresas.length; i++) {

      if (empresas[i].areas) {

        for (let j = 0; j < empresas[i].areas.length; j++) {

          if (empresas[i].areas[j].departamentos) {

            for (let d = 0; d < empresas[i].areas[j].departamentos.length; d++) {

              if (empresas[i].areas[j].departamentos[d].puestos && empresas[i].areas[j].departamentos[d]._id === iddepartamento) {

                for (let p = 0; p < empresas[i].areas[j].departamentos[d].puestos.length; p++) {

                  let puesto = {
                    id: empresas[i].areas[j].departamentos[d].puestos[p]._id,
                    name: empresas[i].areas[j].departamentos[d].puestos[p].name,
                    departamentoname: empresas[i].areas[j].departamentos[d].name,
                    areaname: empresas[i].areas[j].name,
                    empresaname: empresas[i].name,
                  }
                  rows.push(puesto)
                }
              }


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

  function cargarPuestos(id) {
    EmpresaService.getAll()
      .then(response => {
        setpuestos(obtenerPuestos(response.data, id))
        setStatepuesto({
          ...statepuesto,
          idpuestos: '',
        });


      })
      .catch(e => {
        console.log(e);
      });
  }
  const [stateempresa, setStateempresa] = React.useState({
    idempresa: '',
    name: '',
  });

  const handleChangeempresa = (event) => {
    if (event.target.value != '') {
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
    if (event.target.value != '') {
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
    if (event.target.value != '') {
      cargarPuestos(event.target.value)
    }
    const name = event.target.name;
    setStatedepartamento({
      ...statedepartamento,
      [name]: event.target.value,
    });
    //console.log(state)
  };
  const [statepuesto, setStatepuesto] = React.useState({
    idpuesto: '',
    name: '',
  });

  const handleChangepuesto = (event) => {
    const name = event.target.name;
    setStatepuesto({
      ...statepuesto,
      [name]: event.target.value,
    });
    //console.log(state)
  };












  const [id, setId] = React.useState('');



  const [cuil, setCuil] = React.useState('');
  const [apellido, setApellido] = React.useState('');
  const [nombre, setNombre] = React.useState('');
  const [legajo, setLegajo] = React.useState('');

  const [nacimiento, setNacimiento] = React.useState('');
  const [nacionalidad, setNacionalidad] = React.useState('');
  const [estadocivil, setEstadocivil] = React.useState('');

  const [telefono, setTelefono] = React.useState('');
  const [correo, setCorreo] = React.useState('');
  const [direccion, setDireccion] = React.useState('');

function modificarPuesto () {
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
  setId(props.cuil);
}


 function ActualizarEmpleado () {
    var data = {
      cuil: cuil,
      nombre: nombre,
      legajo: legajo,
      apellido: apellido,

      telefono: telefono,
      correo: correo,
      direccion: direccion,

      estadoCivil: estadocivil,
      nacionalidad: nacionalidad,
      fechaNacimiento: nacimiento,
    };
    if (data.cuil != '' && data.nombre != '' && data.legajo != '' && data.apellido != '' && data.telefono != '' && data.correo != '' && data.direccion != '' && data.estadocivil != '' && data.nacionalidad != '' && data.nacimiento != '') {
      console.log('correcto');
    } else {
      swal("Error!", "Complete todos los campos!", "error");
      return 1;
    }

    EmpleadoService.update(props.cuil, data)
      .then(response => {

        console.log(response.data);

        setId(response.data.body._id);

      
     

        //msj cargado exitosament
        swal("Correcto!", "Se agrego con exito a la tabla!", "success");
        // permitir pasar a la otra pagina
        setActiveStep((prevActiveStep) => prevActiveStep + 1);



      })
      .catch(e => {
        console.log(e);
        swal("Error!", "No se logro cargarlo!", "error");

      });


  }





  var saveEmpleado = function () {
    var data = {
      cuil: cuil,
      nombre: nombre,
      legajo: legajo,
      apellido: apellido,

      telefono: telefono,
      correo: correo,
      direccion: direccion,

      estadoCivil: estadocivil,
      nacionalidad: nacionalidad,
      fechaNacimiento: nacimiento,
    };
    if (data.cuil != '' && data.nombre != '' && data.legajo != '' && data.apellido != '' && data.telefono != '' && data.correo != '' && data.direccion != '' && data.estadocivil != '' && data.nacionalidad != '' && data.nacimiento != '') {
      console.log('correcto');
    } else {
      swal("Error!", "Complete todos los campos!", "error");
      return 1;
    }

    EmpleadoService.create(data)
      .then(response => {

        console.log(response.data);

        setId(response.data.body._id);

      
        // borrar todos los campos con set
        setCuil('');
        setApellido('');
        setNombre('');
        setLegajo('');

        setNacimiento('');
        setNacionalidad('');
        setEstadocivil('');

        setTelefono('');
        setCorreo('');
        setDireccion('');


        //msj cargado exitosament
        swal("Correcto!", "Se agrego con exito a la tabla!", "success");
        // permitir pasar a la otra pagina
        setActiveStep((prevActiveStep) => prevActiveStep + 1);



      })
      .catch(e => {
        console.log(e);
        swal("Error!", "No se logro cargarlo!", "error");

      });


  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };







  const [puestosEmpleado, setPuestosEmpleado] = React.useState([]);



  function asignarPuesto() {
    var data = {
      idPuesto: statepuesto.idpuesto,
    };

    //cuil de empleado o id?
    console.log(id);

    //actualizar empleado 
    EmpleadoService.updateWork(id, data)
      .then(response => {

        console.log(response.data);



        // borrar todos los campos del combo box
        setStateempresa({
          idempresa: '',
          name: '',
        });
        setStatedepartamento({
          iddepartamento: '',
          name: '',
        });
        setStatearea({
          idarea: '',
          name: '',
        });
        setStatepuesto({
          idpuesto: '',
          name: '',
        });


        //msj cargado exitosament
        swal("Correcto!", "Se agrego con exito!", "success");

        // actualizar tabla -> pedir el empleado, ver sus puestos (por cada puesto ver a que pertenece)
        //actualizarEmpleado();
      




      })
      .catch(e => {
        console.log(e);
        swal("Error!", "No se logro asociar el puesto!", "error");
     
      });





  }



  function actualizarEmpleado() {
    EmpleadosService.getOne(id)
      .then(response => {

        console.log('actualiza empleado: '+ response.data)
        setPuestosEmpleado(response.data.puestos);
        

      })
      .catch(e => {
        console.log(e);
      });


  }




  function changeCuil(e) {
    setCuil(e.target.value)
  }
  function changeApellido(e) {
    setApellido(e.target.value)
  }
  function changeNombre(e) {
    setNombre(e.target.value)
  }
  function changeLegajo(e) {
    setLegajo(e.target.value)
  }
  function changeNacimiento(e) {
    setNacimiento(e.target.value)
  }
  function changeNacionalidad(e) {
    setNacionalidad(e.target.value)
  }
  function changeEstadocivil(e) {
    setEstadocivil(e.target.value)
  }
  function changeTelefono(e) {
    setTelefono(e.target.value)
  }
  function changeCorreo(e) {
    setCorreo(e.target.value)
  }
  function changeDireccion(e) {
    setDireccion(e.target.value)
  }


  function cambiarPage() {
    window.location.href = '/empleados';
  }






  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}></Typography>
            <Button onClick={handleReset}>Verificar Datos</Button>
          </div>
        ) : (
          <div>
            <br></br>
            {activeStep === steps.length - 1 ? (
              <Grid container spacing={2}
                justifyContent="center"
                direction="row"
                alignItems="center">

                <Grid item>
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
                </Grid>


                <Grid item>

                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-simple">Area</InputLabel>
                    <Select
                      native
                      style={{ width: 150 }}
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
                </Grid>


                <Grid item>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-simple">Departamento</InputLabel>
                    <Select
                      native
                      style={{ width: 150 }}
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

                </Grid>


                <Grid item>

                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-simple">Puesto</InputLabel>
                    <Select
                      native
                      value={statepuesto.idpuesto}
                      onChange={handleChangepuesto}
                      style={{ width: 150 }}
                      inputProps={{
                        name: 'idpuesto',
                        id: 'age-native-simple',
                      }}
                    >
                      <option aria-label="None" value="" />
                      {puestos.map((option) => (
                        <option value={option.id}>{option.name}</option>
                      ))}

                    </Select>
                  </FormControl>


                </Grid>

                <Grid item>
                  <Button variant="contained" color="primary" onClick={asignarPuesto} >
                    Asignar puesto
                  </Button>
                </Grid>
                <Grid item>
                  <PuestosAsignados
                    puestos={puestosEmpleado}
                    verDatos = {false}
                    idEmpleado = {id}
                    actualizarDatoEmpleado = {actualizarEmpleado}
                    
                  />
                </Grid>

              </Grid>
            ) : (
              <Grid container spacing={2}
                justifyContent="center"
                alignItems="center">

                {mode === 'nuevo' ? (

                  <Grid item><TextField id="outlined-search" label="CUIL" type="search" onChange={changeCuil} variant="outlined" value={cuil} /></Grid>

                ) : (

                  <Grid item><TextField id="outlined-search" label="CUIL" type="search" onChange={changeCuil} variant="outlined" value={cuil} disabled /></Grid>

                )}



                <Grid item><TextField id="outlined-search" label="Apellido" type="search" onChange={changeApellido} variant="outlined" value={apellido} /></Grid>
                <Grid item><TextField id="outlined-search" label="Nombre" type="search" onChange={changeNombre} variant="outlined" value={nombre} /></Grid>
                <Grid item><TextField id="outlined-search" label="Legajo" type="search" onChange={changeLegajo} variant="outlined" value={legajo} /></Grid>
                <Grid item>

                  <TextField id="outlined-search" label="Fecha de nacimiento" type="search" onChange={changeNacimiento} variant="outlined" value={nacimiento} />

                </Grid>
                <Grid item><TextField id="outlined-search" label="Nacionalidad" type="search" onChange={changeNacionalidad} variant="outlined" value={nacionalidad} /></Grid>
                <Grid item>   <TextField id="outlined-search" label="Estado civil" type="search" onChange={changeEstadocivil} variant="outlined" value={estadocivil} /></Grid>
                <Grid item><TextField id="outlined-search" label="Telefono" type="search" onChange={changeTelefono} variant="outlined" value={telefono} /></Grid>
                <Grid item> <TextField id="outlined-search" label="Correo electronico" onChange={changeCorreo} type="search" variant="outlined" value={correo} /></Grid>
                <Grid item><TextField id="outlined-search" style={{ minWidth: '75vh' }} label="Direccion" onChange={changeDireccion} type="search" variant="outlined" value={direccion} /></Grid>










              </Grid>
            )}
            <br></br>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0 || mode === 'nuevo'}
                onClick={handleBack}
                className={classes.backButton}
              >
                Volver
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button variant="contained" color="primary" onClick={cambiarPage}>
                  Finalizar
                </Button>
              ) : (

                <div>

                  {mode === 'nuevo' ? (
                    <Button variant="contained" color="primary" onClick={handleNext}>
                      Siguiente
                    </Button>
                  ) : (
                    <div>
                      <Button variant="contained" color="primary" onClick={ActualizarEmpleado}>
                        actualizar Datos
                      </Button>

                      <Button variant="contained" color="primary" onClick={modificarPuesto} style={{float:'right'}}>
                        modificar puesto
                      </Button>
                    </div>



                  )}
                </div>

              )}

            </div>
            <br></br>
          </div>
        )}
      </div>
    </div>
  );
}
