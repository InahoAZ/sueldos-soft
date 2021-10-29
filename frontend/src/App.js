import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { styles } from "./css-common"


import Datosempresa from "./components/datosempresa.component";
import Opciones from "./components/opciones.component";
import Empleados from "./components/empleados.component";
import Empleado from "./components/empleado.component";
import Footer from "./components/footer.component"

import Convenios from "./components/convenios.component";
import Sueldos from "./components/sueldos/sueldo.component";

import Prueba from "./components/reporte/pdf.component";

import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SettingsIcon from '@material-ui/icons/Settings';

class App extends Component {
  render() {
    const { classes } = this.props

    return (
      <div>
        <div style={{minHeight: '94vh'}}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <Grid
              item xs={12}
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
            <Typography className={classes.name} variant="h6">
              SueldoSoft
            </Typography>
            <Link to={"/datosempresa"} className={classes.link}>
              <Typography variant="body2">
                Empresa
              </Typography>
            </Link>
            <Link to={"/empleados"} className={classes.link}>
              <Typography variant="body2">
                Empleados
            </Typography>
            </Link>
            <Link to={"/convenios"} className={classes.link}>
              <Typography variant="body2">
                Convenios
            </Typography>
            </Link>
            <Link to={"/sueldos"} className={classes.link}>
              <Typography variant="body2">
                Sueldos
            </Typography>
            </Link>
            <Link to={"/prueba"} className={classes.link}>
              <Typography variant="body2">
                Prueba
            </Typography>
            </Link>
            </Grid>
            <Grid>
            <Link to={"/opciones"} className={classes.link}>
            <SettingsIcon/>
            </Link>
            </Grid>
            
          </Toolbar>
        </AppBar>

          <Switch>
            <Route exact path={["/", "/sueldos"]} component={Sueldos} />
            <Route exact path="/convenios" component={Convenios} />
            <Route exact path="/prueba" component={Prueba} />
            <Route exact path="/datosempresa" component={Datosempresa} />
            <Route exact path="/empleados" component={Empleados} />
            <Route exact path="/empleado/:cuil" component={Empleado} />
            <Route exact path="/opciones" component={Opciones} />
          </Switch>
          </div>
          <Footer/>
      </div>
    );
  }
}

export default withStyles(styles)(App);