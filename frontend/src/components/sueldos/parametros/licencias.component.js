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
        backgroundColor: theme.palette.background.paper,
    },
    tabs: {
        backgroundColor: '#7dd5d1',
    },
}));
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septimbre', 'Octubre', 'Noviembre', 'Diciembre'];
const exposiciones = ['Restar dias', 'Descontar aparte']
export default function Licencias() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [mes, setMes] = React.useState('');
    const [expo, setExposicion] = React.useState('');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.tabs}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Accidente/Enfermedad inculpable" {...a11yProps(0)} />
                    <Tab label="Riesgos Trabajo - ILT" {...a11yProps(1)} />

                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} >

                <Grid container
                    direction="row"

                    justifyContent="center"
                    alignItems="center">

                    <TextField
                        label="Días"
                        placeholder='0'
                        style={{ width: 250, margin: 12, marginLeft: 12 }}
                        className={clsx(classes.margin, classes.textField)}

                        variant="outlined"
                    />

                    <Autocomplete
                        id="country-select-mes" // puesto
                        value=''
                        onChange={(event, newValue) => {
                            setMes(newValue);

                        }}

                        style={{ width: 250, marginLeft: 12 }}
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
                        style={{ width: 250, margin: 12, marginLeft: 12 }}
                        className={clsx(classes.margin, classes.textField)}

                        variant="outlined"
                    />

                    <Autocomplete
                        id="country-select-expo" // puesto
                        value=''
                        onChange={(event, newValue) => {
                            setExposicion(newValue);

                        }}

                        style={{ width: 250, marginLeft: 12 }}
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
                        style={{ width: 250, margin: 12, marginLeft: 12 }}
                        className={clsx(classes.margin, classes.textField)}

                        variant="outlined"
                    />

<Autocomplete
                        id="country-select-mes" // puesto
                        value=''
                        onChange={(event, newValue) => {
                            setMes(newValue);

                        }}

                        style={{ width: 250, marginLeft: 12 }}
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

        </div>
    );
}
