import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        //backgroundColor: theme.palette.background.paper,
    },
    tabs: {
        backgroundColor: '#7dd5d1',
    },
}));
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septimbre', 'Octubre', 'Noviembre', 'Diciembre'];
const exposiciones = ['Restar dias', 'Descontar aparte']
export default function Licencias(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [mes, setMes] = React.useState('');
    const [expo, setExposicion] = React.useState('');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>


            <Grid container
                direction="row"

                justifyContent="center"
                alignItems="center">

<Paper elevation={3} style={{ minWidth: 250, margin: 10, backgroundColor: '#91e1e938', padding: 10, paddingLeft: 25 }}>
                        Aplicar licencia
                        <Switch
                            checked={props.props.licenciaSinGoce}
                            onChange={props.props.onChangeLicenciaSinGoce}
                            name="checkedE"
                            color='primary'
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </Paper>

                    <TextField
                        label="Días de licencia"
                        placeholder='0'
                        style={{ width: 250, margin: 12, marginLeft: 12 }}
                        className={clsx(classes.margin, classes.textField)}
                        type="number"
                        variant="outlined"
                        onChange={props.props.onChangeDiasInculpable}
                        value={props.props.diasInculpable}
                    />
                    <TextField
                        label="Nombre de la licencia"
                        placeholder='0'
                        style={{ width: 250, margin: 12, marginLeft: 12 }}
                        className={clsx(classes.margin, classes.textField)}

                        variant="outlined"
                        onChange={props.props.onChangeNombreLicencia}
                        value={props.props.nombreLicencia}
                    />

            </Grid>

            {/*
            <AppBar position="static" className={classes.tabs}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Sin goce de sueldo" {...a11yProps(0)} />
                    <Tab label="Con goce de sueldo" {...a11yProps(1)} />

                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} >

                <Grid container
                    direction="row"

                    justifyContent="center"
                    alignItems="center">



                   



                    <Autocomplete
                        id="country-select-mes" // puesto
                        defaultValue={props.props.mesInicioInculpable}
                        key={props.props.mesInicioInculpable + 1}
                        onChange={(event, newValue) => {
                            //setValueEmpresa(newValue);

                            props.props.onChangeMesInicioInculpable(newValue);

                        }}

                        style={{ width: 250, marginLeft: 12, display: 'none' }}
                        options={meses}
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
                                label="Mes de inicio"
                                variant="outlined"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />

                </Grid>



            </TabPanel>
            <TabPanel value={value} index={1} >
                <Grid container
                    direction="row"

                    justifyContent="center"
                    alignItems="center">

                    <TextField
                        label="Días"
                        placeholder='0'
                        style={{ width: 250, margin: 12, marginLeft: 12, display: 'none' }}
                        className={clsx(classes.margin, classes.textField)}
                        type="number"
                        variant="outlined"
                        onChange={props.props.onChangeDiasILT}
                        value={props.props.diasILT}
                    />

                    <Autocomplete
                        id="country-select-expo" // puesto
                        defaultValue={props.props.exposicionLicenciaILT}
                        key={props.props.exposicionLicenciaILT + 2}
                        onChange={(event, newValue) => {
                            //setValueEmpresa(newValue);

                            props.props.onChangeExposicionLicenciaILT(newValue);

                        }}

                        style={{ width: 250, marginLeft: 12, display: 'none' }}
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
                                label="Exposición"
                                variant="outlined"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />


                    <TextField
                        label="Días a cargo de la empresa"
                        placeholder='0'
                        style={{ width: 250, margin: 12, marginLeft: 12, display: 'none' }}
                        className={clsx(classes.margin, classes.textField)}
                        type="number"
                        variant="outlined"
                        onChange={props.props.onChangeDiasACargoEmpresaILT}
                        value={props.props.diasACargoEmpresaILT}
                    />

                    <Autocomplete
                        id="country-select-mes" // puesto
                        defaultValue={props.props.mesInicioILT}
                        key={props.props.mesInicioILT}
                        onChange={(event, newValue) => {
                            //setValueEmpresa(newValue);

                            props.props.onChangeMesInicioILT(newValue);

                        }}

                        style={{ width: 250, marginLeft: 12, display: 'none' }}
                        options={meses}
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
                                label="Mes de inicio"
                                variant="outlined"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />

                </Grid>
            </TabPanel>
            */}

        </div>
    );
}
