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

const computoAntiguaedades = ['2020', '2021'];

const useStyles = makeStyles({
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
});



export default function Adicionales({ onChangeCategoria }) {
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

    function onChangeCat(e) {
        onChangeCategoria(e.target.value);
    }


    return (

        <div>

            <Grid container
                direction="row"

                justifyContent="center"
                alignItems="center">






                <Paper elevation={3} style={{ minWidth: 150, margin: 10,  backgroundColor: '#91e1e938', padding: 10, paddingLeft: 25 }}>
                    Calcular
                    <Switch
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="checkedA"
                        color='primary'
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Paper>






                <Autocomplete
                    id="country-select-empresa"
                    value={valueEmpresa}
                    onChange={(event, newValue) => {
                        //setValueEmpresa(newValue);
                        setComputoAntiguedad(newValue);

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
                            label="Año"
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
                    style={{ width: 250, margin: 12, marginLeft: 12 }}
                    className={clsx(classes.margin, classes.textField)}
                    type="number"
                    variant="outlined"
                />

                <TextField
                    label="Días hábiles"
                    placeholder='0'
                    style={{ width: 250, margin: 12, marginLeft: 12 }}
                    className={clsx(classes.margin, classes.textField)}
                    type="number"
                    variant="outlined"
                />
                <TextField
                    label="Días trabajados"
                    placeholder='0'
                    style={{ width: 250, margin: 12, marginLeft: 12 }}
                    className={clsx(classes.margin, classes.textField)}
                    type="number"
                    variant="outlined"
                />






            </Grid>





        </div>

    );
}