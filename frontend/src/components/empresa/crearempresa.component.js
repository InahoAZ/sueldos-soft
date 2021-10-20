import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Listaempresas from './listaempresa.component'

import EmpresaService from '../../services/empresa.service'
import Divider from '@material-ui/core/Divider';
import swal from 'sweetalert';

export default class CrearEmpresa extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();

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
        });
        console.log(response.data);
        this.child.current.refreshList();
        // borrar text
        document.getElementById("empresanombre").value='';
          //msj cargado exitosament
          swal("Correcto!", "Se agrego con exito a la tabla!", "success");

      })
      .catch(e => {
        console.log(e);
        swal("Error!", "No se logro cargarlo!", "error");
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
        
        <Typography variant="h5" >
          Crear empresa
        </Typography>
        <TextField id="empresanombre" label="Nombre de empresa" color="secondary" onChange={this.onChangeName} />
        <Button variant="contained" color="primary" onClick={this.saveEmpresa}>
          Crear
        </Button>
        
      </Grid>
      <br></br>
      <Divider></Divider>
      <br></br>
      <Grid item>
        <Listaempresas ref={this.child}/>
      </Grid>
    </Grid>

    </Grid>
    );

  }



}
 
