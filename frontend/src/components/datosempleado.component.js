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

const countries = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    { code: 'AE', label: 'United Arab Emirates', phone: '971' },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'AL', label: 'Albania', phone: '355' },
    { code: 'AM', label: 'Armenia', phone: '374' },
    { code: 'AO', label: 'Angola', phone: '244' },
    { code: 'AQ', label: 'Antarctica', phone: '672' },
    { code: 'AR', label: 'Argentina', phone: '54' },
];


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


export default function HorizontalLabelPositionBelowStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        
        saveEmpleado()
        // si es correcto llamar al segundo puesto
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    function saveEmpleado() {
        var data = {
          cuil: cuil,
          nombre: nombre,
          apellido: apellido,

          telefono: telefono,
          correo: correo,
          direccion: direccion,

          estadoCivil: estadocivil,
          nacionalidad: nacionalidad,
          fechaNacimiento: nacimiento,
        };
    
        EmpleadoService.create(data)
          .then(response => {
            
            console.log(response.data);
            this.child.current.refreshList();
            // borrar todos los campos con set
            this.setCuil('');
            this.setApellido('');
            this.setNombre('');

            this.setNacimiento('');
            this.setNacionalidad('');
            this.setEstadocivil('');

            this.setTelefono('');
            this.setCorreo('');
            this.setDireccion('');


              //msj cargado exitosament
              swal("Correcto!", "Se agrego con exito a la tabla!", "success");
    
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

    const [valueEmpresa, setValueEmpresa] = React.useState(countries[0]);
    const [inputValueEmpresa, setInputValueEmpresa] = React.useState('');

    function cambioEmpresa() {
        console.log(valueEmpresa);
        console.log(inputValueEmpresa);
    }
    function asignarPuesto(){
        console.log('ok');
    }
    function changeCuil(e) {
        setCuil( e.target.value)
      }
      function changeApellido(e) {
        setApellido( e.target.value)
      }
      function changeNombre(e) {
        setNombre( e.target.value)
      }
      function changeNacimiento(e) {
        setNacimiento( e.target.value)
      }
      function changeNacionalidad(e) {
        setNacionalidad( e.target.value)
      }
      function changeEstadocivil(e) {
        setEstadocivil( e.target.value)
      }
      function changeTelefono(e) {
        setTelefono( e.target.value)
      }
      function changeCorreo(e) {
        setCorreo( e.target.value)
      }
      function changeDireccion(e) {
        setDireccion( e.target.value)
      }


    function cambiarPage() {
        window.location.href = '/empleados';
    }



    const [cuil, setCuil] = React.useState('');
    const [apellido, setApellido] = React.useState('');
    const [nombre, setNombre] = React.useState('');

    const [nacimiento, setNacimiento] = React.useState('');
    const [nacionalidad, setNacionalidad] = React.useState('');
    const [estadocivil, setEstadocivil] = React.useState('');

    const [telefono, setTelefono] = React.useState('');
    const [correo, setCorreo] = React.useState('');
    const [direccion, setDireccion] = React.useState('');










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
                                <Grid item> <Autocomplete
                                    id="country-select-empresa"
                                    value={valueEmpresa}
                                    onChange={(event, newValue) => {
                                        setValueEmpresa(newValue);
                                        cambioEmpresa();
                                    }}
                                    inputValue={inputValueEmpresa}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValueEmpresa(newInputValue);
                                    }}
                                    style={{ minWidth: '35vh' }} 
                                    options={countries}
                                    classes={{
                                        option: classes.option,
                                    }}
                                    autoHighlight
                                    getOptionLabel={(option) => option.label}
                                    renderOption={(option) => (
                                        <React.Fragment>
                                            <span>{option.code}</span>
                                            {option.label} ({option.code}) +{option.phone}
                                        </React.Fragment>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Seleccione empresa"
                                            variant="outlined"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                            }}
                                        />
                                    )}
                                /></Grid>
                                <Grid item> <Autocomplete
                                    id="country-select-empresa"
                                    value={valueEmpresa}
                                    onChange={(event, newValue) => {
                                        setValueEmpresa(newValue);
                                        cambioEmpresa();
                                    }}
                                    inputValue={inputValueEmpresa}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValueEmpresa(newInputValue);
                                    }}
                                    style={{ width: 250 }}
                                    options={countries}
                                    classes={{
                                        option: classes.option,
                                    }}
                                    autoHighlight
                                    getOptionLabel={(option) => option.label}
                                    renderOption={(option) => (
                                        <React.Fragment>
                                            <span>{option.code}</span>
                                            {option.label} ({option.code}) +{option.phone}
                                        </React.Fragment>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Seleccione empresa"
                                            variant="outlined"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                            }}
                                        />
                                    )}
                                /></Grid>
                                <Grid item> <Autocomplete
                                    id="country-select-empresa"
                                    value={valueEmpresa}
                                    onChange={(event, newValue) => {
                                        setValueEmpresa(newValue);
                                        cambioEmpresa();
                                    }}
                                    inputValue={inputValueEmpresa}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValueEmpresa(newInputValue);
                                    }}
                                    style={{ width: 250 }}
                                    options={countries}
                                    classes={{
                                        option: classes.option,
                                    }}
                                    autoHighlight
                                    getOptionLabel={(option) => option.label}
                                    renderOption={(option) => (
                                        <React.Fragment>
                                            <span>{option.code}</span>
                                            {option.label} ({option.code}) +{option.phone}
                                        </React.Fragment>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Seleccione empresa"
                                            variant="outlined"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                            }}
                                        />
                                    )}
                                /></Grid>
                                <Grid item> <Autocomplete 
                                    id="country-select-empresa"
                                    value={valueEmpresa}
                                    onChange={(event, newValue) => {
                                        setValueEmpresa(newValue);
                                        cambioEmpresa();
                                    }}
                                    inputValue={inputValueEmpresa}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValueEmpresa(newInputValue);
                                    }}
                                    style={{ minWidth: '55vh' }} 
                                    options={countries}
                                    classes={{
                                        option: classes.option,
                                    }}
                                    autoHighlight
                                    getOptionLabel={(option) => option.label}
                                    renderOption={(option) => (
                                        <React.Fragment>
                                            <span>{option.code}</span>
                                            {option.label} ({option.code}) +{option.phone}
                                        </React.Fragment>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Seleccione empresa"
                                            variant="outlined"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                            }}
                                        />
                                    )}
                                /></Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={asignarPuesto} >
                                        Asignar puesto
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <PuestosAsignados/>
                                </Grid>

                            </Grid>
                        ) : (
                            <Grid container spacing={2}
                                justifyContent="center"
                                alignItems="center">
                                <Grid item><TextField id="outlined-search" label="CUIL" type="search" onChange={changeCuil} variant="outlined" /></Grid>
                                <Grid item><TextField id="outlined-search" label="Apellido" type="search" onChange={changeApellido} variant="outlined" /></Grid>
                                <Grid item><TextField id="outlined-search" label="Nombre" type="search" onChange={changeNombre} variant="outlined" /></Grid>
                                <Grid item> 
                                
                                <TextField id="outlined-search" label="Fecha de nacimiento" type="search" onChange={changeNacimiento} variant="outlined" />
                                
                                </Grid>
                                <Grid item><TextField id="outlined-search" label="Nacionalidad" type="search" onChange={changeNacionalidad} variant="outlined" /></Grid>
                                <Grid item>   <TextField id="outlined-search" label="Estado civil" type="search" onChange={changeEstadocivil} variant="outlined" /></Grid>
                                <Grid item><TextField id="outlined-search" label="Telefono" type="search" onChange={changeTelefono} variant="outlined" /></Grid>
                                <Grid item> <TextField id="outlined-search" label="Correo electronico" onChange={changeCorreo} type="search" variant="outlined" /></Grid>
                                <Grid item><TextField id="outlined-search" style={{ minWidth: '85vh' }} label="Direccion" onChange={changeDireccion} type="search" variant="outlined" /></Grid>










                            </Grid>
                        )}
                        <br></br>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <div>
                            <Button
                                disabled={activeStep === 0}
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
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                Siguiente
                            </Button>
                            )}
                           
                        </div>
                        <br></br>
                    </div>
                )}
            </div>
        </div>
    );
}
