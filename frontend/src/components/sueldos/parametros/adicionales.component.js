import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';

const computoAntiguaedades = ['Mes siguiente', 'Mes cumplido'];

const useStyles = makeStyles({
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
});



export default function Adicionales(props) {
    const classes = useStyles();


    const [computoAntiguedad, setComputoAntiguedad] = React.useState('');



    const [inputValuePuesto, setInputValuePuesto] = React.useState('');


    const [empresas, setEmpresas] = React.useState([]);
    const [valueEmpresa, setValueEmpresa] = React.useState(empresas[0]);
    const [inputValueEmpresa, setInputValueEmpresa] = React.useState('');


    const [empleados, setEmpleados] = React.useState([]);
    const [valueEmpleado, setValueEmpleado] = React.useState(empleados[0]);
    const [inputValueEmpleado, setInputValueEmpleado] = React.useState('');


    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: false,
        checkedE: false,
        checkedF: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };



    return (

        <div>

            <Grid container
                direction="row"

                justifyContent="center"
                alignItems="center">






                <Paper elevation={3} style={{ minWidth: 250, margin: 10, backgroundColor: '#91e1e938', padding: 10, paddingLeft: 25 }}>
                    Adicional vidrierista
                    <Switch
                        checked={props.props.adicionalVidrierista}
                        onChange={props.props.onChangeAdicionalVidrierista}
                        name="checkedA"
                        color='primary'
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Paper>
                <Paper elevation={3} style={{ minWidth: 250, margin: 10, backgroundColor: '#91e1e938', padding: 10, paddingLeft: 25 }}>
                    Adicional por asistencia
                    <Switch
                        checked={props.props.adicionalAsistencia}
                        onChange={props.props.onChangeAdicionalAsistencia}
                        name="checkedB"
                        color='primary'
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Paper>
                <Paper elevation={3} style={{ minWidth: 250, margin: 10, backgroundColor: '#91e1e938', padding: 10, paddingLeft: 25 }}>
                    Antiguedad Acumulativa
                    <Switch
                        checked={props.props.antiguedadAcumulativa}
                        onChange={props.props.onChangeAntiguedadAcumulativa}
                        name="checkedC"
                        color='primary'
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Paper>





                <Autocomplete
                    id="country-select-empresa"
                    defaultValue={props.props.antiguedadComputo}
                    key={props.props.antiguedadComputo}
                    onChange={(event, newValue) => {
                        //setValueEmpresa(newValue);

                        props.props.onChangeAntiguedadComputo(newValue);

                    }}

                    style={{ width: 250 }}
                    options={computoAntiguaedades}
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
                            label="Computo antiguedad"
                            variant="outlined"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />












                <TextField
                    label="Antigüedad (años)"
                    placeholder='0'
                    type="number"
                    style={{ width: 250, margin: 12, marginLeft: 12 }}
                    className={clsx(classes.margin, classes.textField)}
                    onChange={props.props.onChangeAntiguedadAños}
                    value={props.props.antiguedadAños}
                    variant="outlined"
                />

                <TextField
                    label="Zona"
                    placeholder='12'
                    type="number"
                    id="outlined-end-adornment"
                    style={{ width: 250, margin: 12, marginLeft: 12 }}
                    className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    onChange={props.props.onChangeporcentajeXzona}
                    value={props.props.porcentajeXzona}
                    variant="outlined"
                />

                <TextField
                    label="% Antigüedad x año"
                    placeholder='12'
                    type="number"
                    id="outlined-end-adornment"
                    style={{ width: 250, margin: 12, marginLeft: 12 }}
                    className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    onChange={props.props.onChangePorcentajeAntiguedadxAño}
                    value={props.props.porcentajeAntiguedadxAño}
                    variant="outlined"
                />






            </Grid>





        </div>

    );
}