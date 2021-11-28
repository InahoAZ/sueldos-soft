import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import Modal from '@material-ui/core/Modal';

import Liquidaciones from './liquidaciones.component'
import Perfil from './perfil.component'

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
        width: '100%',
    },
    tabs: {
        backgroundColor: '#dbe8ff9c',
    },
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
}));







export default function GestionarInicio(props) {
    const rootRef = React.useRef(null);
    

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [modalState, setModalState] = React.useState(true);
    

    const [persona, setPersona] = React.useState(props.persona());

    function ver() {
        setPersona(props.persona())
        setModalState(false);

    }




    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (

        <div>
            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                disableScrollLock={true}
                open={modalState}
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                className={classes.modal}
                container={() => rootRef.current}
            >
                <div className={classes.paper}>
                    <h2 id="server-modal-title">Bienvenido</h2>
                    <p id="server-modal-description">Aqui podra ver todas sus liquidaciones mensuales que le han generado, asi como sus datos personales que estan cargados.</p>
                    <Button variant="contained" color="green" onClick={ver} style={{ marginBottom: '20px', marginTop: '20px' }} >
                        ok
                    </Button>
                
                </div>
               
            </Modal>
            <Grid
                container

                direction="column"
                alignItems="center"
            >

                <Grid item

                    xs={12}
                    sm={11}
                    md={10}
                    lg={8}
                    xl={6}
                    container
                    direction="column"
                    alignItems="flex-start"
                >
                    <Typography variant="h4" style={{ margin: 20 }}>
                        Bienvenido "{persona.nombre}"
                    </Typography>
                   
                    <br></br>

                    <div className={classes.root}>
                        <AppBar position="static">
                            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                <Tab label="Liquidaciones" {...a11yProps(0)} />
                                <Tab label="Datos personales" {...a11yProps(1)} />

                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0} className={classes.tabs}>
                            <Liquidaciones />
                        </TabPanel>
                        <TabPanel value={value} index={1} className={classes.tabs}>
                            <Perfil 
                            personaDic={persona}
                            />
                        </TabPanel>


                    </div>




                </Grid>
            </Grid>
        </div>

    );
}
