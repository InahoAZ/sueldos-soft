import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import background from "../img/wood.png";
import LinearProgress from '@material-ui/core/LinearProgress';
import swal from 'sweetalert';



const useStyles = makeStyles({
    root: {
        minWidth: 175,
        padding: 20
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
export default function Login(props) {
    const classes = useStyles();
    const [statusTime, setStatusTime] = React.useState(false);
    const [user, setUser] = React.useState('');

    const [pass, setPass] = React.useState('');
    
    function ingresar (){

        if (user != '' && pass != ''){

            document.getElementById('carga').style.display = 'block';
            setStatusTime(true);
    
            
            
            setTimeout(() => {  console.log("disimulando..."); 
            document.getElementById('carga').style.display = 'none';
            setStatusTime(false);
    
            if(user == 'admin' && pass == 'admin'){
                props.login('admin')
    
            } else {
                //el empleado existe -> cargar vista
                props.login('empleado')
            }
            setUser('');
            setPass('');
        
        
        
        }, 3000);
        }else{

            swal("Error!", "Los campos no deben estar vacios!", "error");
        }

       
        
        
    }
   

    function onChangeUser(e) {
        setUser(e.target.value);
      }

      function onChangePass(e) {
        setPass(e.target.value);
      }



    return (
        <div style={{minHeight:'100vh', 
            backgroundImage: `url(${background})`, backgroundSize: 'cover',
            overflow: 'hidden' 
          }}>
            <Grid container spacing={3}
                justifyContent="center"
                alignItems="center">
                <Grid item xs={6}  md={3}>
                

                    <Card className={classes.root} style={{marginTop:70}}>
                    
                        <Typography variant="h5" style={{ textAlign: 'center' }}>Login</Typography>
                        <LinearProgress id='carga' style={{display:'none'}}/>
                        <br></br>
                        <Grid container spacing={3}
                            justifyContent="center"
                            alignItems="center">

                            <TextField
                                label="Usuario"
                                id="usuario"
                                disabled={statusTime}
                                placeholder='user/CUIT'
                                style={{ width: 250, margin: 12, marginLeft: 12 }}
                                className={clsx(classes.margin, classes.textField)}
                                onChange={onChangeUser}
                                variant="outlined"
                                value={user}
                            />
                            <TextField
                                label="Contraseña"
                                id="password"
                                disabled={statusTime}
                                placeholder='********'
                                style={{ width: 250, margin: 12, marginLeft: 12 }}
                                className={clsx(classes.margin, classes.textField)}
                                onChange={onChangePass}
                                variant="outlined"
                                value={pass}
                            />

                        </Grid>
                        <br></br>
                        <center>
                            <Button variant="contained" disabled={statusTime} onClick={ingresar} style={{ minWidth: 250, backgroundColor: 'black', color: 'white' }}>
                                INGRESAR
                            </Button>
                            
                        </center>
                        <br></br>



                    </Card>
                </Grid>
            </Grid>



        </div>
    );
}