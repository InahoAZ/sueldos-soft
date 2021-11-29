import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { styles } from "./css-common"



import Datosempresa from "./components/datosempresa.component";

import Empleados from "./components/empleados.component";
import Empleado from "./components/empleado.component";
import Footer from "./components/footer.component"
import IconButton from '@material-ui/core/IconButton';
import Convenios from "./components/convenio/gestionconvenios.component";
import Sueldos from "./components/sueldos/sueldo.component";

import InicioEmpleado from "./components/vistaEmpleado/inicio.component"

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';


import Login from './components/login.component';



var personaInfo = {nombre: ''};
function login(nombre) {
  if (nombre === 'admin') {
    document.getElementById('paginaAdmin').style.display = 'block'
    document.getElementById('paginaEmpleado').style.display = 'none'
    document.getElementById('login').style.display = 'none'
  } else {
    document.getElementById('paginaAdmin').style.display = 'none'
    document.getElementById('paginaEmpleado').style.display = 'block'
    document.getElementById('login').style.display = 'none'
   
    personaInfo = nombre;
    
  }

}

function persona() {
  
  var aux = personaInfo
return aux
}

function logout() {

  document.getElementById('login').style.display = 'block'
  document.getElementById('paginaAdmin').style.display = 'none'
  document.getElementById('paginaEmpleado').style.display = 'none'
}

class App extends Component {




  render() {
    const { classes } = this.props

    return (
      <div>
        <div id='login' style={{ minHeight: '94vh' }}>

          

          <Login
          login={login}
          />

        </div>
        <div id='paginaEmpleado' style={{ minHeight: '94vh', display: 'none' }}>
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



              </Grid>
              <Grid>
                <IconButton color="secondary" onClick={logout} >
                  <ExitToAppIcon />
                </IconButton>
              </Grid>

            </Toolbar>
          </AppBar>
          <InicioEmpleado
              persona={persona}
          />
          

        </div>
        <div id='paginaAdmin' style={{ minHeight: '94vh', display: 'none' }}>
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
                    Empresas
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

              </Grid>
              <Grid>


                <IconButton color="secondary" onClick={logout} >
                  <ExitToAppIcon />
                </IconButton>

              </Grid>

            </Toolbar>
          </AppBar>
          <Switch>
            <Route exact path={["/", "/sueldos"]} component={Sueldos} />
            <Route exact path="/convenios" component={Convenios} />

            <Route exact path="/datosempresa" component={Datosempresa} />
            <Route exact path="/empleados" component={Empleados} />
            <Route exact path="/empleado/:cuil" component={Empleado} />

          </Switch>

        </div>
        <Footer />



      </div>
    );
  }
}

export default withStyles(styles)(App);