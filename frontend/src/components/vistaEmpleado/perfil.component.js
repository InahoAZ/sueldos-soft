import React from 'react';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


export default function Perfil(props) {
    const classes = useStyles();
    const [persona, setPersona] = React.useState(props.personaDic);

   

    return (

        <div>
             
            <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="flex-start"
            >
                <TextField
                    id="standard-read-only-input"
                    label="CUIL"
                    style={{margin: 5}}
                    defaultValue={persona.cuil}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="standard-read-only-input"
                    label="Apellido"
                    style={{margin: 5}}
                    defaultValue={persona.apellido}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="standard-read-only-input"
                    label="Nombre"
                    style={{margin: 5}}
                    defaultValue={persona.nombre}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="standard-read-only-input"
                    label="Fecha de Nacimiento"
                    style={{margin: 5}}
                    defaultValue={persona.fechaNacimiento}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="standard-read-only-input"
                    label="Nacionalidad"
                    style={{margin: 5}}
                    defaultValue={persona.nacionalidad}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="standard-read-only-input"
                    label="Estado civil"
                    style={{margin: 5}}
                    defaultValue={persona.estadoCivil}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="standard-read-only-input"
                    label="Telefono"
                    style={{margin: 5}}
                    defaultValue={persona.telefono}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="standard-read-only-input"
                    label="Correo electronico"
                    style={{margin: 5}}
                    defaultValue={persona.correo}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="standard-read-only-input"
                    label="Direccion"
                    style={{margin: 5}}
                    defaultValue={persona.direccion}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                />
                
            </Grid>


        </div>

    );

}