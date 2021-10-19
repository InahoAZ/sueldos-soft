import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DataEmpleado from './datosempleado.component'

export default function CargaEmpleado(props) {
    
    const cuil = props.match.params.cuil
    
    
    function cambiarPage() {
        props.history.push('/empleados')
    }

    let frase = '';
    if (cuil != 0) {
        frase = 'Formulario para editar un empleado';
    } else {
        frase = ' Formulario para cargar un nuevo empleado ';
    }

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
                <Grid container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <Grid >
                        <Typography component="div">
                            <Box fontFamily="Monospace" fontSize="h6.fontSize" m={1} style={{minWidth:650}}>
                                {frase}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid >
                        <Button variant="contained" color="green" onClick={cambiarPage} style={{ marginBottom: '20px', marginTop: '20px' }} >
                            Volver
                        </Button>
                    </Grid>
                </Grid>



                <Grid>
                    <DataEmpleado/>
                </Grid>





            </Grid>
        </Grid>
    );
}
