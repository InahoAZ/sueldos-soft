import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import swal from 'sweetalert';
import EmpleadosService from '../services/empleados.service'
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const rows = [
  {
    cuil: 64838383,
    apellido: 'gola',
    nombre: 'efefef',
    telefono: 98989898
  },
  {
    cuil: 64838383,
    apellido: 'gola',
    nombre: 'efefef',
    telefono: 98989898
  },
  {
    cuil: 64838383,
    apellido: 'gola',
    nombre: 'efefef',
    telefono: 98989898
  },
  {
    cuil: 64838383,
    apellido: 'gola',
    nombre: 'efefef',
    telefono: 98989898
  },
];



export default function ListaEmpleados(props) {
  const classes = useStyles();
  const [empleados, setEmpleados] = React.useState([]);

  React.useEffect(() => {
    async function retrieveEmpleados() {
      EmpleadosService.getAll()
        .then(response => {
          setEmpleados(response.data)

        })
        .catch(e => {
          console.log(e);
        });
    }
    retrieveEmpleados();
  }, []);


  function cambiarPage() {
    props.history.push('/empleado/0')
  }
  function editarEmpleado(cuil) {
    props.history.push('/empleado/' + cuil)
  }


  function retrieveEmpleados() {
    EmpleadosService.getAll()
      .then(response => {
        setEmpleados(response.data)
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  function refreshList() {
    this.retrieveEmpleados();
  }

  function closeSection() {
    console.log('dd');
    document.getElementById('gridSection').style.display = 'none'
  }
  function openSection(num) {
    console.log(num);
    document.getElementById('gridSection').style.display = 'block'
    //ir al top de la pagina
  }

  function deleteEmpleado(num) {

    swal({
      title: "Esta seguro?",
      text: "Una vez borrado no se puede recuperar!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {


          EmpleadosService.delete(num)
            .then(response => {
              console.log(response.data);
              //eliminado correctamente msj
              swal("Se ha borrado!", {
                icon: "success",
              });
              //actualizar tabla
              this.refreshList()
            })
            .catch(e => {
              console.log(e);
              swal("Error!", "no se logro borrar", "error");
            });



        } else {
          swal("Cancelado!");
        }
      });


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
        <Grid id='gridSection' style={{ display: 'none' }}>
          <Grid container
            direction="row"
            justifyContent="space-between"
            alignItems="center">
            <Grid>
              <Typography variant="h5" >
                Informacion
              </Typography>
            </Grid>
            <Grid>
              <IconButton onClick={closeSection}>
                <CloseIcon fontSize='large' />
              </IconButton>
            </Grid>

          </Grid>
          componente para mostrar la informacion
          <Grid container
            direction="column"
            alignItems="center">

            <Grid>

              <Button variant="contained" onClick={closeSection} style={{ marginBottom: '20px', marginTop: '20px' }} >
                Cerrar
              </Button>
            </Grid>

          </Grid>
          <Divider></Divider>

        </Grid>
        <Grid container
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Grid>
            <Typography variant="h5" >
              Empleados
            </Typography>
          </Grid>
          <Grid>
            <Button variant="contained" color="primary" onClick={cambiarPage} style={{ marginBottom: '20px', marginTop: '20px' }} >
              Cargar empleado
            </Button>
          </Grid>
        </Grid>



        <Grid item>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>CUIL</TableCell>
                  <TableCell align="left">Apellido</TableCell>
                  <TableCell align="left">Nombre</TableCell>
                  <TableCell align="center">Telefono</TableCell>
                  <TableCell align="right">Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {empleados.map((row) => (
                  <TableRow key={row.cuil}>
                    <TableCell component="th" scope="row">
                      {row.cuil}
                    </TableCell>
                    <TableCell align="left">{row.apellido}</TableCell>
                    <TableCell align="left">{row.nombre}</TableCell>
                    <TableCell align="center">{row.telefono}</TableCell>
                    <TableCell align="right">



                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <Grid>

                          <IconButton color="primary" onClick={() => openSection(row.cuil)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Grid>
                        <Grid>
                          <IconButton onClick={() => editarEmpleado(row.cuil)}>
                            <EditIcon />
                          </IconButton>
                        </Grid>
                        <Grid>
                          <IconButton color="secondary" onClick={() => deleteEmpleado(row.cuil)}>
                            <DeleteForeverIcon />
                          </IconButton>
                        </Grid>
                      </Grid>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>


      </Grid>

    </Grid>


  );
}