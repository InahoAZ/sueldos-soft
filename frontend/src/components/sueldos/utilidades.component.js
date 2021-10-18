import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import TodayIcon from '@material-ui/icons/Today';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import GavelIcon from '@material-ui/icons/Gavel';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import ListIcon from '@material-ui/icons/List';
import ListAltIcon from '@material-ui/icons/ListAlt';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
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
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
         
        >
          <Tab label="Opciones basicas" icon={<ListIcon />} {...a11yProps(0)} />
          <Tab label="Opciones generales" icon={<ListAltIcon />} {...a11yProps(1)} />
          <Tab label="Adicionales" icon={<LibraryAddIcon />} {...a11yProps(2)} />
          <Tab label="Feriados" icon={<TodayIcon />} {...a11yProps(3)} />
          <Tab label="Horas extras" icon={<ScheduleIcon />} {...a11yProps(4)} />
          <Tab label="Vacaciones" icon={<FlightTakeoffIcon />} {...a11yProps(5)} />
          <Tab label="Licencias" icon={<GavelIcon />} {...a11yProps(6)} />
          <Tab label="Descuentos" icon={<TrendingDownIcon />} {...a11yProps(7)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}  style={{backgroundColor:'#95f5aabf'}}>
        Opciones basicas
      </TabPanel>
      <TabPanel value={value} index={1} style={{backgroundColor:'#95f5aabf'}} >
        Opciones generales
      </TabPanel>
      <TabPanel value={value} index={2} style={{backgroundColor:'#95f5aabf'}}>
        Adicionales
      </TabPanel>
      <TabPanel value={value} index={3} style={{backgroundColor:'#95f5aabf'}}>
        Feriados
      </TabPanel>
      <TabPanel value={value} index={4} style={{backgroundColor:'#95f5aabf'}}>
        Horas extras
      </TabPanel>
      <TabPanel value={value} index={5} style={{backgroundColor:'#95f5aabf'}}>
        Vacaciones
      </TabPanel>
      <TabPanel value={value} index={6} style={{backgroundColor:'#95f5aabf'}}>
        Licencias
      </TabPanel>
      <TabPanel value={value} index={7} style={{backgroundColor:'#95f5aabf'}}>
        Descuentos
      </TabPanel>
    </div>
  );
}
