import React from 'react';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TabsUtilities from './utilidades.component'
import SelectMain from './seleccion.component'
import Table from './tabla.component'
import background from "../../img/wood.png";
import Button from '@material-ui/core/Button';
import Reporte from '../reporte/pdf.component';
import { height } from 'dom-helpers';
import DatosBancarios from './datosbancarios.component';
import Divider from '@material-ui/core/Divider';


const theme = createTheme();

theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
    },
};



export default function Sueldos(props) {

    const [name, setName] = React.useState('oy');
    const [datosCarga, setDatosCarga] = React.useState({
        id: 'hh',
        empresa: {
            name: 'hola'
        },
        empleado:{
            name: 'hhhh gggggg',
        }
    });

    function onChangeEmpleadoName(n) {
        var data = datosCarga;
        data.id = n;
        setName(n);        
        setDatosCarga(data);
        console.log(datosCarga);
      }


    function generarReporte(){
        if (document.getElementById('reporte').style.display === 'none'){
            document.getElementById('reporte').style.display= 'block';
        }else{
            document.getElementById('reporte').style.display= 'none';
        }
        
       
    }

    return (
        <div style={{minHeight:'100vh', 
            backgroundImage: `url(${background})`, backgroundSize: 'cover',
            overflow: 'hidden' 
          }}>
            
            <br></br>

            <Grid
                container
                
                direction="column"
                alignItems="center"
            >

                <Grid

                    xs={12}
                    sm={11}
                    md={10}
                    lg={8}
                    xl={6}
                    direction="column"
                    alignItems="flex-start"
                >
                    <Typography variant="h5" >
                        Liquidacion mensual de Sueldos
                    </Typography>
                    <br></br>

                    <Divider />
                    <Typography variant="h6" style={{margin:10}}>
                        Datos basicos:
                    </Typography>
                    <Grid>
                   

                        <SelectMain
                        onChangeEmpleadoName={onChangeEmpleadoName}
                        />
                        
                    </Grid>
                    <br></br>
                    <Grid>


                    <DatosBancarios/>
                    
                    </Grid>
                    <br></br>
                    <Divider />

                    

                    
                    <br></br>
                    <Typography variant="h6" style={{margin:10}} >
                        Parametros:
                    </Typography>
                
                    <TabsUtilities />
                    <br></br>
                    <Grid>
                            {/*
                            
                            <Table/>
                            
                            */}
                           
                        

                    </Grid>
                    <center>
                    <Button variant="contained" onClick={generarReporte}   style={{ marginBottom: '20px', marginTop: '20px', backgroundColor:'#95f5aabf' }} >
                            GENERAR REPORTE
                        </Button>
                        </center>

                        <div id='reporte' style={{display: 'none'}}>

                            <Reporte
                            datosCarga={datosCarga}
                            name={name}
                            />
                        </div>
                       
                    




                </Grid>
            </Grid>

        </div>
    );

}
