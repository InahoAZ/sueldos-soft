import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(17),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function DatosBancarios(props) {
    const classes = useStyles();


    return (

        <div className={classes.root}>
            <Accordion style={{ backgroundColor: '#dbe8ff9c' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Datos bancarios y Aporte jubilatorio
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                
                    <Typography>
                 
                        <Grid
                            container
                            
                            direction="column"
                        justifyContent="center"
                        alignItems="center"
                        >

                            <Grid >
                                <Typography variant="h6" style={{ margin: 10 }}>
                                    Deposito bancario:
                                </Typography>
                                <Grid  container
                            xs={12}
                            direction="row"
                        justifyContent="center"
                        alignItems="center">
                                    <TextField
                                        label="Banco"
                                        placeholder=''
                                        style={{ width: 250, margin: 15 }}


                                        variant="outlined"
                                    />
                                    <TextField
                                        label="Numero de cuenta"
                                        placeholder=''
                                        type="number"
                                        style={{ width: 250, margin: 15 }}


                                        variant="outlined"
                                    />
                                    <TextField
                                        label="Fecha de pago"
                                        placeholder=''
                                        style={{ width: 250, margin: 15 }}


                                        variant="outlined"
                                    />
                                    <TextField
                                        label="Lugar de pago"
                                        placeholder=''
                                        style={{ width: 250, margin: 15 }}


                                        variant="outlined"
                                    />


                                </Grid>
                            </Grid>
                            <br></br>
                            <Divider style={{ width: '100%' }}/>
                            <br></br>
                            <Grid>
                                <Typography variant="h6" style={{ margin: 10 }}>
                                    Aporte jubilatorio:
                                </Typography>
                                <Grid item>
                                    <TextField
                                        label="Periodo"
                                        placeholder=''
                                        style={{ width: 200, margin: 10 }}


                                        variant="outlined"
                                    />
                                    <TextField
                                        label="Fecha"
                                        placeholder=''
                                        style={{ width: 200, margin: 10 }}


                                        variant="outlined"
                                    />
                                    <TextField
                                        label="Banco"
                                        placeholder=''
                                        style={{ width: 200, margin: 10 }}


                                        variant="outlined"
                                    />


                                </Grid>
                            </Grid>

                        </Grid>
                    </Typography>
                </AccordionDetails>
            </Accordion>

        </div>

    );

}
