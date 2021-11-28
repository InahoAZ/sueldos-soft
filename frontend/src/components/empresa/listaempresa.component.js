import React, { forwardRef, useImperativeHandle } from 'react';
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
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import swal from 'sweetalert';

import EmpresaService from '../../services/empresa.service'
import Editarempresa from './editempresa.component'
import VerEmpresa from './verdatosempresa.component'





const Child = forwardRef((props, ref) => {
  const [state, setState] = React.useState({
    empresas: [

    ],
  });

  React.useEffect(() => {
    async function retrieveEmpresasauto() {
      EmpresaService.getAll()
        .then(response => {
          setState({
            empresas: response.data
          });
          console.log('Empresas: ');
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    retrieveEmpresasauto();
  }, []);


  function retrieveEmpresas() {
    EmpresaService.getAll()
      .then(response => {
        setState({
          empresas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  function refreshList() {
    retrieveEmpresas();
  }

  useImperativeHandle(
        ref,
        () => ({
          refreshList() {
              retrieveEmpresas()
            }
         }),
     )


  function deleteEmpresa(num) {

    swal({
      title: "Esta seguro?",
      text: "Una vez borrado no se puede recuperar!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {


          EmpresaService.delete(num)
            .then(response => {
              console.log(response.data);
              //eliminado correctamente msj
              swal("Se ha borrado!", {
                icon: "success",
              });
              //actualizar tabla
              refreshList()
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
    <Grid container
      direction="column"
      justifyContent="center"
      alignItems="center">



      <Grid>
        <Typography variant="h5" >
          Empresas
        </Typography>

        <br></br>
        <TableContainer component={Paper}>
          <Table style={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>CUIT</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Telefono</TableCell>

                <TableCell align="right">Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.empresas.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.cuit}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.tipo} 
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.telefono}
                  </TableCell>

                  <TableCell align="right">
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Grid>
                        <VerEmpresa
                          empresaid={row._id}
                          empresa={[row]}
                          refreshList={refreshList}
                        />
                      </Grid>
                      <Grid>
                        <Editarempresa
                          empresaid={row._id}
                          empresa={[row]}
                          refreshList={refreshList}
                        />
                      </Grid>
                      <Grid>
                        <IconButton color="secondary" onClick={() => deleteEmpresa(row._id)}>
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

  );









});

export default Child;

