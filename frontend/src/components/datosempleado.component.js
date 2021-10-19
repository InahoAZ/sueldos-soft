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

import PuestosAsignados from './tablapuestosasignados.component';


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
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

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
                                <Grid item><TextField id="outlined-search" label="CUIL" type="search" variant="outlined" /></Grid>
                                <Grid item><TextField id="outlined-search" label="Apellido" type="search" variant="outlined" /></Grid>
                                <Grid item><TextField id="outlined-search" label="Nombre" type="search" variant="outlined" /></Grid>
                                <Grid item> 
                                
                                <TextField id="outlined-search" label="Fecha de nacimiento" type="search" variant="outlined" />
                                
                                </Grid>
                                <Grid item><TextField id="outlined-search" label="Nacionalidad" type="search" variant="outlined" /></Grid>
                                <Grid item>   <TextField id="outlined-search" label="Estado civil" type="search" variant="outlined" /></Grid>
                                <Grid item><TextField id="outlined-search" label="Telefono" type="search" variant="outlined" /></Grid>
                                <Grid item> <TextField id="outlined-search" label="Correo electronico" type="search" variant="outlined" /></Grid>
                                <Grid item><TextField id="outlined-search" style={{ minWidth: '85vh' }} label="Direccion" type="search" variant="outlined" /></Grid>










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
