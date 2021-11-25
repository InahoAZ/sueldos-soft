import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TablaPuestosAsignados from './tablapuestosasignados.component';

export default function CustomResponsiveFontSizes(props) {


  

  return (

    <div>
        <Grid container spacing={2}
                                justifyContent="center"
                                alignItems="center">
                                <Grid item><TextField id="outlined-search" label="CUIL" type="search" variant="outlined" value={props.persona.cuil} /></Grid>
                                <Grid item><TextField id="outlined-search" label="Apellido" type="search" variant="outlined" value={props.persona.apellido} /></Grid>
                                <Grid item><TextField id="outlined-search" label="Nombre" type="search" variant="outlined" value={props.persona.nombre} /></Grid>
                                <Grid item><TextField id="outlined-search" label="legajo" type="search" variant="outlined" value={props.persona.legajo} /></Grid>
                                <Grid item> 
                                
                                <TextField id="outlined-search" label="Fecha de nacimiento" type="search" variant="outlined" value={props.persona.fechaNacimiento} />
                                
                                </Grid>
                                <Grid item><TextField id="outlined-search" label="Nacionalidad" type="search" variant="outlined" value={props.persona.nacionalidad} /></Grid>
                                <Grid item>   <TextField id="outlined-search" label="Estado civil" type="search" variant="outlined" value={props.persona.estadoCivil} /></Grid>
                                <Grid item><TextField id="outlined-search" label="Telefono" type="search" variant="outlined" value={props.persona.telefono} /></Grid>
                                <Grid item> <TextField id="outlined-search" label="Correo electronico" type="search" variant="outlined" value={props.persona.correo} /></Grid>
                                <Grid item><TextField id="outlined-search" style={{ minWidth: '75vh' }} label="Direccion" type="search" variant="outlined" value={props.persona.direccion} /></Grid>

    <Grid item>

        <TablaPuestosAsignados
          puestos = {props.persona.puestos}
          verDatos = {true}
          idEmpleado = {''}
        />
    </Grid>








                            </Grid>



    </div>
    
  );
}
