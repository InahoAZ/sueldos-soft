import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Listaempresas from './listaempresa.component'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function ColorTextFields() {
  const classes = useStyles();

  return (
      <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      >
          <Grid>
              <Listaempresas/>
          </Grid>
    <Typography variant="h5" >
    Crear empresa
  </Typography>
    
      <TextField id="standard-secondary" label="Nombre de empresa" color="secondary" />
      
    
    <Button variant="contained" color="primary" >
        Crear
      </Button>
    </Grid>
  );
}
