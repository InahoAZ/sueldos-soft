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

import EmpresaService from '../../services/empresa.service'
import Editarempresa from './editempresa.component'






export default class ListarEmpresa extends Component {

  constructor(props) {
    super(props);

    this.retrieveEmpresas = this.retrieveEmpresas.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.deleteEmpresa = this.deleteEmpresa.bind(this);
    this.state = {
      empresas: [
        {
          id: '3333',
          name: 'ERROR',
        },
      ],
    };
  }

  componentDidMount() {
    this.retrieveEmpresas();
  }

  retrieveEmpresas() {
    EmpresaService.getAll()
      .then(response => {
        this.setState({
          empresas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveEmpresas();
  }


  deleteEmpresa(num) {

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


    const { empresas } = this.state;

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
                  <TableCell>Nombre</TableCell>

                  <TableCell align="right">Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {empresas.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>

                    <TableCell align="right">
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <Grid>
                          <Editarempresa
                            empresaid={row.id}
                            empresaname={row.name}
                            refreshList={this.refreshList}
                          />
                        </Grid>
                        <Grid>
                          <IconButton color="secondary" onClick={() => this.deleteEmpresa(row.id)}>
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
