import React, { Component } from 'react';
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

import DepartamentoService from '../../services/departamento.service'
import Editardepartamento from './editdepartamento.component'






export default class ListarDepartamento extends Component {

  constructor(props) {
    super(props);

    this.retrieveDepartamentos = this.retrieveDepartamentos.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.deleteDepartamento = this.deleteDepartamento.bind(this);
    this.state = {
      departamentos: [
        {
          id: '3333',
          name: 'ERROR',
          empresaname: 'ningubo'
        },
      ],
    };
  }

  componentDidMount() {
    this.retrieveDepartamentos();
  }

  retrieveDepartamentos() {
    DepartamentoService.getAll()
      .then(response => {
        this.setState({
          departamentos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveDepartamentos();
  }


  deleteDepartamento(num) {

    swal({
      title: "Esta seguro?",
      text: "Una vez borrado no se puede recuperar!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {


          DepartamentoService.delete(num)
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


  render() {


    const { departamentos } = this.state;

    return (
      <Grid container
        direction="column"
        justifyContent="center"
        alignItems="center">



        <Grid>
          <Typography variant="h5" >
            Departamentos
          </Typography>

          <br></br>
          <TableContainer component={Paper}>
            <Table style={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="center">Area</TableCell>
                  <TableCell align="center">Empresa</TableCell>
                  <TableCell align="right">Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departamentos.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">

                      {row.areaname}
                    </TableCell>
                    <TableCell align="center">

                      {row.empresaname}
                    </TableCell>


                    <TableCell align="right">
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <Grid>
                          <Editardepartamento
                            departamentoid={row.id}
                            departamentoname={row.name}
                            refreshList={this.refreshList}
                          />
                        </Grid>
                        <Grid>
                          <IconButton color="secondary" onClick={() => this.deleteDepartamento(row.id)}>
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
  }








}

