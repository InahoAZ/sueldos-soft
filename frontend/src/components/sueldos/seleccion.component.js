import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
});


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

export default function Sueldos(props) {
    const classes = useStyles();

    const [valueConvenio, setValueConvenio] = React.useState(countries[0]);
    const [inputValueConvenio, setInputValueConvenio] = React.useState('');

    function cambioConvenio(){
        console.log(valueConvenio);
        console.log(inputValueConvenio);
    }

    const [valueEmpresa, setValueEmpresa] = React.useState(countries[0]);
    const [inputValueEmpresa, setInputValueEmpresa] = React.useState('');

    function cambioEmpresa(){
        console.log(valueEmpresa);
        console.log(inputValueEmpresa);
    }

    const [valueEmpleado, setValueEmpleado] = React.useState(countries[0]);
    const [inputValueEmpleado, setInputValueEmpleado] = React.useState('');

    function cambioEmpleado(){
        console.log(valueEmpleado);
        console.log(inputValueEmpleado);
    }

    return (
        <Grid
        container
                xs={12}
                direction="row"
  justifyContent="space-around"
  alignItems="center"
        >
        <Autocomplete
            id="country-select-convenio"
            value={valueConvenio}
            onChange={(event, newValue) => {
                setValueConvenio(newValue);
                cambioConvenio();
            }}
            inputValue={inputValueConvenio}
            onInputChange={(event, newInputValue) => {
                setInputValueConvenio(newInputValue);
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
                    label="Seleccione convenio"
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
        />
        <Autocomplete
            id="country-select-empleado"
            value={valueEmpleado}
            onChange={(event, newValue) => {
                setValueEmpleado(newValue);
                cambioEmpleado();
            }}
            inputValue={inputValueEmpleado}
            onInputChange={(event, newInputValue) => {
                setInputValueEmpleado(newInputValue);
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
                    label="Seleccione empleado"
                    variant="outlined"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
        </Grid>
    );

}
