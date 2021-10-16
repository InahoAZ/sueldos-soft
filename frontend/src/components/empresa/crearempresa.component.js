import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Listaempresas from './listaempresa.component'

import EmpresaService from '../../services/empresa.service'



export default class CrearEmpresa extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    
    this.saveEmpresa = this.saveEmpresa.bind(this);

    this.state = {
      id: null,
      name: ""
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }



  saveEmpresa() {
    var data = {
      name: this.state.name,
    };

    EmpresaService.create(data)
      .then(response => {
        this.setState({
          id: null,
          name: '',
          // agregarlo a la tabla
          //msj cargado exitosamente

        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render (){

    return (
    <Grid
    container
    xs={12}
    direction="column"
    alignItems="center"
    >
      
      <Grid
    
    xs={7}
    direction="column"
    alignItems="flex-start"
    >
      <Grid item>
        <Listaempresas />
      </Grid>

      <br></br>

      <Grid item>
        
        <Typography variant="h5" >
          Crear empresa
        </Typography>
        <TextField id="name" label="Nombre de empresa" color="secondary" onChange={this.onChangeName} value={this.state.name}/>
        <Button variant="contained" color="primary" onClick={this.saveEmpresa}>
          Crear
        </Button>
        
      </Grid>

    </Grid>

    </Grid>
    );

  }



}
 
