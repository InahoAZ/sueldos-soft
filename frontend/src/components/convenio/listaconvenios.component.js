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

import ConvenioService from '../../services/convenio.service'
import Editarbasico from './editarbasico.component'

import EmpresaService from '../../services/empresa.service'




export default class ListarConvenio extends Component {

  constructor(props) {
    super(props);

    this.retrieveConvenios = this.retrieveConvenios.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.deleteConvenio = this.deleteConvenio.bind(this);
    this.state = {
      convenios: [
        {
          id: '3333',
          name: 'ERROR',
          empresaname: 'ningubo'
        },
      ],
    };
  }

  obtenerConvenios(empresas) {
    console.log(empresas);
    let rows = [];
    for (let i = 0;i<empresas.length;i++){
      
      if (empresas[i].areas){
        
        for (let j = 0;j<empresas[i].areas.length;j++){
          
          if (empresas[i].areas[j].convenios){
           
            for (let d = 0;d<empresas[i].areas[j].convenios.length;d++){
              
              
                  let convenio = {
                    id: empresas[i].areas[j].convenios[d]._id,
                    name: empresas[i].areas[j].convenios[d].name,
                    areaname: empresas[i].areas[j].name,
                    empresaname: empresas[i].name,
                  
                  }
                  rows.push(convenio)

            
            }
          }
        }
      }
    }



    return rows
  }

  componentDidMount() {
    this.retrieveConvenios();
  }

  retrieveConvenios() {
    EmpresaService.getAll()
      .then(response => {
        this.setState({
          convenios: this.obtenerConvenios(response.data)
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveConvenios();
  }


  deleteConvenio(num) {

    swal({
      title: "Esta seguro?",
      text: "Una vez borrado no se puede recuperar!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {


          ConvenioService.delete(num)
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


    const { convenios } = this.state;

    return (
      <Grid container
        direction="column"
        justifyContent="center"
        alignItems="center">



        <Grid>
          <Typography variant="h5" >
            Convenios
          </Typography>

          <br></br>
          <TableContainer component={Paper}>
            <Table style={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="center">Vigencia desde</TableCell>
                  <TableCell align="center">Categoria</TableCell>
                  <TableCell align="center">Sub-Categoria</TableCell>
                  <TableCell align="center">Basico</TableCell>
                  <TableCell align="right">Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {convenios.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">

                      {row.areaname}
                    </TableCell>
                    <TableCell align="center">

                      {row.areaname}
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
                          <Editarbasico
                            convenioid={row.id}
                            convenioname={row.name}
                            refreshList={this.refreshList}
                          />
                        </Grid>
                        <Grid>
                          <IconButton color="secondary" onClick={() => this.deleteConvenio(row.id)}>
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

