import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="opciones básicas" {...a11yProps(0)} />
          <Tab label="opciones generales" {...a11yProps(1)} />
          <Tab label="adicionales" {...a11yProps(2)} />
          <Tab label="feriados" {...a11yProps(3)} />
          <Tab label="horas extras" {...a11yProps(4)} />
          <Tab label="vacaciones" {...a11yProps(5)} />
          <Tab label="licencias" {...a11yProps(6)} />
          <Tab label="descuentos" {...a11yProps(7)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      opciones básicas
      </TabPanel>
      <TabPanel value={value} index={1}>
      opciones generales
      </TabPanel>
      <TabPanel value={value} index={2}>
        adicionales
      </TabPanel>
      <TabPanel value={value} index={3}>
        horas extras
      </TabPanel>
      <TabPanel value={value} index={4}>
        vacaciones
      </TabPanel>
      <TabPanel value={value} index={5}>
        licencias
      </TabPanel>
      <TabPanel value={value} index={6}>
        descuentos
      </TabPanel>
      <TabPanel value={value} index={7}>
        feriados
      </TabPanel>
    </div>
  );
}