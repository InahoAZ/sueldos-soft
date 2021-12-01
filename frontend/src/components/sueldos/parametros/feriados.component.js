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

const exposiciones = ['Diferencia', 'Sumar y Restar'];

const criteriosNot = ['Base 25', 'Base 30'];
const criteriost = ['Base 30/25', 'Todo base 25', 'Todo base 30'];

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


    const [exposicion, setExposicion] = React.useState('');

    const [criterioNOt, setCriterioNOt] = React.useState('');
    const [criteriot, setCriteriot] = React.useState('');



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
                    id="country-select-empresa"
                    defaultValue={props.props.exposicionFeriado}
                    key={props.props.exposicionFeriado}
                    onChange={(event, newValue) => {
                        //setValueEmpresa(newValue);

                        props.props.onChangeExposicionFeriado(newValue);

                    }}

                    style={{ width: 250 }}
                    options={exposiciones}
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
                            label="Exposicion"
                            variant="outlined"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />












                <TextField
                    label="Dias Trabajados"
                    placeholder='0'
                    type="number"
                    style={{ width: 250, margin: 12, marginLeft: 12 }}
                    className={clsx(classes.margin, classes.textField)}
                    onChange={props.props.onChangeDiasTrabajados}
                    value={props.props.diasTrabajados}
                    variant="outlined"
                />

                <TextField
                    label="Dias No trabajados"
                    type="number"
                    placeholder='0'
                    style={{ width: 250, margin: 12, marginLeft: 12 }}
                    className={clsx(classes.margin, classes.textField)}
                    onChange={props.props.onChangeDiasNoTrabajados}
                    value={props.props.diasNoTrabajados}
                    variant="outlined"
                />




                <Autocomplete
                    id="country-select-empresa"
                    defaultValue={props.props.criterioTrabajados}
                    key={props.props.criterioTrabajados}
                    onChange={(event, newValue) => {
                        //setValueEmpresa(newValue);

                        props.props.onChangeCriterioTrabajados(newValue);

                    }}

                    style={{ width: 250 }}
                    options={criteriost}
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
                            label="Criterio trabajados"
                            variant="outlined"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
                <Autocomplete
                    id="country-select-empresa"
                    defaultValue={props.props.criterioNoTrabajados}
                    key={props.props.criterioNoTrabajados}
                    onChange={(event, newValue) => {
                        //setValueEmpresa(newValue);

                        props.props.onChangeCriterioNoTrabajados(newValue);

                    }}

                    style={{ width: 250, marginLeft: 15 }}
                    options={criteriosNot}
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
                            label="Criterio No trabajados"
                            variant="outlined"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />







            </Grid>





        </div>

    );
}