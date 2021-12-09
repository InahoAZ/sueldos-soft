import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';


const edades = ['Mayor', '17 años', '16 años'];
const jornadas = ['4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '48'];
const useStyles = makeStyles({
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
});



export default function Basicos(props) {
    const classes = useStyles();

    const [puestos, setPuestos] = React.useState([]);

    const [categoria, setCategoria] = React.useState('');
    const [edad, setEdad] = React.useState('');
    const [jornada, setJornada] = React.useState('');


    const [valuePuesto, setValuePuesto] = React.useState(puestos[0]);
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






                <Autocomplete
                    id="country-select-empresa6"
                    defaultValue={props.props.edad}
                    key={props.props.edad}
                    onChange={(event, newValue) => {
                        //setValueEmpresa(newValue);

                        props.props.onChangeEdad(newValue);

                    }}

                    style={{ width: 250, marginBottom: 12, marginLeft: 12, display: 'none' }}
                    options={edades}
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
                            label="Seleccione edad"
                            variant="outlined"
                            value={props.props.edad}
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
                <Autocomplete
                    id="country-select-puestohh" // puesto
                    defaultValue={props.props.jornadaHoras}
                    key={props.props.jornadaHoras + 1}
                    onChange={(event, newValue) => {
                        //setValueEmpresa(newValue);

                        props.props.onChangeJornadaHoras(newValue);

                    }}

                    style={{ width: 250, marginBottom: 12, marginLeft: 12 }}
                    options={jornadas}
                    classes={{
                        option: classes.option,
                    }}
                    autoHighlight
                    getOptionLabel={(option) => option}
                    renderOption={(option) => (
                        <React.Fragment>
                            <span>{option} hs</span>

                        </React.Fragment>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Seleccione jornada"
                            variant="outlined"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />



                <Paper elevation={3} style={{ minWidth: 250, margin: 10, backgroundColor: '#91e1e938', padding: 10, paddingLeft: 25, display: 'none' }}>
                    Trabajador jubilado
                    <Switch
                        checked={props.props.esJubilado}
                        onChange={props.props.onChangeEsJubilado}
                        name="checkedA"
                        color='primary'
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Paper>
                <Paper elevation={3} style={{ minWidth: 250, margin: 10, backgroundColor: '#91e1e938', padding: 10, paddingLeft: 25 }}>
                    Calcular SAC
                    <Switch
                        checked={props.props.calcularSac}
                        onChange={props.props.onChangeCalcularSac}
                        name="checkedB"
                        color='primary'
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Paper>
                {props.props.calcularSac &&
<Grid
container
direction="row"

justifyContent="center"
alignItems="center"
>
                    <TextField
                        label="Mejor sueldo del año"

                        placeholder='0'
                        style={{ width: 250, margin: 12, marginLeft: 12 }}
                        className={clsx(classes.margin, classes.textField)}
                        type="number"
                        variant="outlined"
                        onChange={props.props.onChangeMejorSueldo}
                        value={props.props.mejorSueldo}
                    />
                    
                    <TextField
                        label="Dias Trabajados el Semestre"

                        placeholder='0'
                        style={{ width: 250, margin: 12, marginLeft: 12 }}
                        className={clsx(classes.margin, classes.textField)}
                        type="number"
                        variant="outlined"
                        onChange={props.props.onChangeDiasTrabajadosSemestre}
                        value={props.props.diasTrabajadosSemestre}
                    />
                    
                    <TextField
                        label="Total dias semestre"

                        placeholder='0'
                        style={{ width: 250, margin: 12, marginLeft: 12 }}
                        className={clsx(classes.margin, classes.textField)}
                        type="number"
                        variant="outlined"
                        onChange={props.props.onChangeDiasSemestre}
                        value={props.props.diasSemestre}
                    />
                    </Grid>

                }

                <Paper elevation={3} style={{ minWidth: 250, margin: 10, backgroundColor: '#91e1e938', padding: 10, paddingLeft: 25 }}>
                    Adicional asistencia
                    <Switch
                        checked={props.props.adicionalAsistencia}
                        onChange={props.props.onChangeAdicionalAsistencia}
                        name="checkedC"
                        color='primary'
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Paper>






                <Paper elevation={3} style={{ minWidth: 250, margin: 10, backgroundColor: '#91e1e938', padding: 10, paddingLeft: 25, display: 'none' }}>
                    Incremento solidario (Dto. 14/20)
                    <Switch
                        checked={props.props.incrementoSolidario}
                        onChange={props.props.onChangeIncrementoSolidario}
                        name="checkedD"
                        color='primary'
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Paper>
                <Paper elevation={3} style={{ minWidth: 250, margin: 10, backgroundColor: '#91e1e938', padding: 10, paddingLeft: 25 }}>
                    Aporte solidario OSECAC
                    <Switch
                        checked={props.props.aporteSolidarioOsecac}
                        onChange={props.props.onChangeAporteSolidarioOsecac}
                        name="checkedE"
                        color='primary'
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Paper>
                <Paper elevation={3} style={{ minWidth: 250, margin: 10, backgroundColor: '#91e1e938', padding: 10, paddingLeft: 25 }}>
                    Aporte OSECAC
                    <Switch
                        checked={props.props.aporteOsecac}
                        onChange={props.props.onChangeAporteOsecac}
                        name="checkedF"
                        color='primary'
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Paper>






                <TextField
                    label="Antigüedad (años)"
                    placeholder='0'
                    style={{ width: 250, margin: 12, marginLeft: 12 }}
                    className={clsx(classes.margin, classes.textField)}
                    type="number"
                    variant="outlined"
                    onChange={props.props.onChangeAntiguedadAños}
                    value={props.props.antiguedadAños}
                />

                <TextField
                    label="Cuota sindical"
                    placeholder='12'
                    id="outlined-end-adornment"
                    style={{ width: 250, margin: 12, marginLeft: 12, display: 'none' }}
                    className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    onChange={props.props.onChangeCuotaSindical}
                    value={props.props.cuotaSindical}
                    variant="outlined"
                    type="number"
                />

                <TextField
                    label="Redondear"
                    placeholder='0'
                    style={{ width: 250, margin: 12, marginLeft: 12, display: 'none' }}
                    className={clsx(classes.margin, classes.textField)}
                    type="number"
                    variant="outlined"
                    onChange={props.props.onChangeRedondear}
                    value={props.props.redondear}
                />



            </Grid>





        </div>

    );
}