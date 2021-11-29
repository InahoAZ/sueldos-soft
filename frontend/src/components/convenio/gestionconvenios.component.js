import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';




import Convenio from './convenioabm.component'
import Categoria from './categorias.component'
import SumasDescuentos from './sumasdescuentos.component'

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
    tabs:{
        backgroundColor: '#dbe8ff9c',
      },
  }));







export default function GestionarConvenios(props) {


    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    return (

        <div>
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
                    <Typography variant="h5" style={{ margin: 20 }}>
                        Gestion de convenios
                    </Typography>
                    <br></br>

                    <div className={classes.root}>
                        <AppBar position="static">
                            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                <Tab label="Convenios" {...a11yProps(0)} />
                                <Tab label="Categorias" {...a11yProps(1)} />
                                <Tab label="Sumas/Descuentos" {...a11yProps(2)} />
                                
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0} className={classes.tabs}>
                            <Convenio/>
                        </TabPanel>
                        <TabPanel value={value} index={1} className={classes.tabs}>
                            <Categoria/>
                        </TabPanel>
                        <TabPanel value={value} index={2} className={classes.tabs}>
                            <SumasDescuentos/>
                        </TabPanel>
                        
                    </div>




                </Grid>
            </Grid>
        </div>

    );
}
