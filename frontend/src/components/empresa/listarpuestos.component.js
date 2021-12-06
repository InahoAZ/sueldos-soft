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
import PuestoService from '../../services/puesto.service'
import Editarpuesto from './editpuestos.component'

import ConveniosService from '../../services/convenio.service'


var convenios = ['jh']




export default class ListarPuesto extends Component {

  constructor(props) {
    super(props);

    this.retrievePuestos = this.retrievePuestos.bind(this);

    this.refreshList = this.refreshList.bind(this);

    this.deletePuesto = this.deletePuesto.bind(this);
    this.state = {
      puestos: [
        {
          id: '3333',
          name: 'ERROR',
          empresaname: 'ningubo'
        },
      ],
    };

  }
  catFromSub(idSubcat) {
    var result = 'null'
    var diclist = convenios;

    for (let i = 0; i < diclist.length; i++) {

      if (diclist[i].categorias) {

        for (let j = 0; j < diclist[i].categorias.length; j++) {

          if (diclist[i].categorias[j].subcategorias) {

            for (let d = 0; d < diclist[i].categorias[j].subcategorias.length; d++) {

              if (diclist[i].categorias[j].subcategorias[d]._id === idSubcat) {
                
                result = diclist[i].categorias[j]._id
              }


            }
          }
        }
      }
    }


    return result;
  }

  catAndSubcat(idSubcat) {
    console.log('f');
    console.log(convenios);




    var result = 'null'
    var diclist = convenios;

    for (let i = 0; i < diclist.length; i++) {

      if (diclist[i].categorias) {

        for (let j = 0; j < diclist[i].categorias.length; j++) {

          if (diclist[i].categorias[j].subcategorias) {

            for (let d = 0; d < diclist[i].categorias[j].subcategorias.length; d++) {

              if (diclist[i].categorias[j].subcategorias[d]._id === idSubcat) {
                console.log(diclist[i].categorias[j]);
                result = diclist[i].categorias[j].name + ' - ' + diclist[i].categorias[j].subcategorias[d].name
              }


            }
          }
        }
      }
    }


    return result;
  }



  obtenerPuestos(empresas) {
    console.log(empresas);
    let rows = [];
    for (let i = 0; i < empresas.length; i++) {

      if (empresas[i].areas) {

        for (let j = 0; j < empresas[i].areas.length; j++) {

          if (empresas[i].areas[j].departamentos) {

            for (let d = 0; d < empresas[i].areas[j].departamentos.length; d++) {

              if (empresas[i].areas[j].departamentos[d].puestos) {
                for (let p = 0; p < empresas[i].areas[j].departamentos[d].puestos.length; p++) {



                  let puesto = {
                    id: empresas[i].areas[j].departamentos[d].puestos[p]._id,
                    idConvenio: empresas[i].areas[j].departamentos[d].puestos[p].convenio,
                    name: empresas[i].areas[j].departamentos[d].puestos[p].name,
                    departamentoname: empresas[i].areas[j].departamentos[d].name,
                    areaname: empresas[i].areas[j].name,
                    empresaname: empresas[i].name,
                    idSubCat: empresas[i].areas[j].departamentos[d].puestos[p].convenio_subcat,
                    idCat: this.catFromSub(empresas[i].areas[j].departamentos[d].puestos[p].convenio_subcat),
                    catAndSubcat: this.catAndSubcat(empresas[i].areas[j].departamentos[d].puestos[p].convenio_subcat),
                  }
                  rows.push(puesto)

                }

              }
            }
          }
        }
      }
    }



    return rows
  }

  componentDidMount() {
    this.getConvenios();
    this.retrievePuestos();

  }
  getConvenios() {
    ConveniosService.getAll()
      .then(response => {
        //paso intermedio transformar las empresas a solo las que poseen puestos

        convenios = response.data;
        console.log('car')
      })
      .catch(e => {
        console.log(e);
      });

  }

  retrievePuestos() {
    EmpresaService.getAll()
      .then(response => {
        //paso intermedio transformar las empresas a solo las que poseen puestos

        this.setState({
          puestos: this.obtenerPuestos(response.data)
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePuestos();

  }


  deletePuesto(num) {

    swal({
      title: "Esta seguro?",
      text: "Una vez borrado no se puede recuperar!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {


          PuestoService.delete(num)
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


    const { puestos } = this.state;

    return (
      <Grid container
        direction="column"
        justifyContent="center"
        alignItems="center">



        <Grid>
          <Typography variant="h5" >
            Puestos
          </Typography>

          <br></br>
          <TableContainer component={Paper}>
            <Table style={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="center">Departamento</TableCell>
                  <TableCell align="center">Area</TableCell>
                  <TableCell align="center">Empresa</TableCell>
                  <TableCell align="center">Categoria</TableCell>
                  <TableCell align="right">Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {puestos.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">

                      {row.departamentoname}
                    </TableCell>
                    <TableCell align="center">

                      {row.areaname}
                    </TableCell>
                    <TableCell align="center">

                      {row.empresaname}
                    </TableCell>
                    <TableCell align="center">

                      {row.catAndSubcat}
                    </TableCell>


                    <TableCell align="right">
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <Grid>
                          <Editarpuesto
                            puestoid={row.id}
                            puestoname={row.name}
                            idConvenio={row.idConvenio}
                            idCat={row.idCat}
                            idSub={row.idSubCat} 
                            refreshList={this.refreshList}
                          />
                        </Grid>
                        <Grid>
                          <IconButton color="secondary" onClick={() => this.deletePuesto(row.id)}>
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

