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

import AreaService from '../../services/area.service'
import Editararea from './editarea.component'

import EmpresaService from '../../services/empresa.service'




export default class ListarArea extends Component {

  constructor(props) {
    super(props);

    this.retrieveAreas = this.retrieveAreas.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.deleteArea = this.deleteArea.bind(this);
    this.state = {
      areas: [
        {
          id: '3333',
          name: 'ERROR',
          empresaname: 'ningubo'
        },
      ],
    };
  }

  obtenerAreas(empresas) {
    console.log(empresas);
    let rows = [];
    for (let i = 0;i<empresas.length;i++){
      
      if (empresas[i].areas){
        
        for (let j = 0;j<empresas[i].areas.length;j++){
          
         
                  let area = {
                    id: empresas[i].areas[j]._id,
                    name: empresas[i].areas[j].name,
                    empresaname: empresas[i].name,
                  }
                  rows.push(area)

        }
      }
    }



    return rows
  }

  componentDidMount() {
    this.retrieveAreas();
  }

  retrieveAreas() {
    EmpresaService.getAll()
      .then(response => {
        this.setState({
          areas: this.obtenerAreas(response.data)
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAreas();
  }


  deleteArea(num) {

    swal({
      title: "Esta seguro?",
      text: "Una vez borrado no se puede recuperar!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {


        AreaService.delete(num)
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


    const { areas } = this.state;

    return (
      <Grid container
        direction="column"
        justifyContent="center"
        alignItems="center">



        <Grid>
          <Typography variant="h5" >
            Areas
          </Typography>
          
          <br></br>
          <TableContainer component={Paper}>
            <Table style={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="center">Empresa</TableCell>
                  <TableCell align="right">Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {areas.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
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
                          <Editararea
                            areaid={row.id}
                            areaname={row.name}
                            refreshList={this.refreshList}
                          />
                        </Grid>
                        <Grid>
                          <IconButton color="secondary" onClick={() => this.deleteArea(row.id)}>
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

