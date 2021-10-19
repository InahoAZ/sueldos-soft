import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TablaPuestosAsignados from './tablapuestosasignados.component';

export default function CustomResponsiveFontSizes() {



  return (

    <div>
        <Grid container spacing={2}
                                justifyContent="center"
                                alignItems="center">
                                <Grid item><TextField id="outlined-search" label="CUIL" type="search" variant="outlined" /></Grid>
                                <Grid item><TextField id="outlined-search" label="Apellido" type="search" variant="outlined" /></Grid>
                                <Grid item><TextField id="outlined-search" label="Nombre" type="search" variant="outlined" /></Grid>
                                <Grid item> 
                                
                                <TextField id="outlined-search" label="Fecha de nacimiento" type="search" variant="outlined" />
                                
                                </Grid>
                                <Grid item><TextField id="outlined-search" label="Nacionalidad" type="search" variant="outlined" /></Grid>
                                <Grid item>   <TextField id="outlined-search" label="Estado civil" type="search" variant="outlined" /></Grid>
                                <Grid item><TextField id="outlined-search" label="Telefono" type="search" variant="outlined" /></Grid>
                                <Grid item> <TextField id="outlined-search" label="Correo electronico" type="search" variant="outlined" /></Grid>
                                <Grid item><TextField id="outlined-search" style={{ minWidth: '85vh' }} label="Direccion" type="search" variant="outlined" /></Grid>

    <Grid item>

        <TablaPuestosAsignados/>
    </Grid>








                            </Grid>



    </div>
    
  );
}
