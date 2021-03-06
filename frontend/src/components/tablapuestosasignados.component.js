
import React, { forwardRef, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import swal from 'sweetalert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import EmpresaService from '../services/empresa.service';
import PuestoService from '../services/puesto.service';
import EmpleadoService from '../services/empleados.service';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  //createData('Ningun puesto asociado', '', '', '', ''),

];




const Child = forwardRef((props, ref) => {

  const [puestosAsociados, setPuestosAsociados] = React.useState([]);

  const classes = useStyles();
  

  if (props.idEmpleado === ''){
    let puestos = [];
    if (props.puestos) {
      puestos = props.puestos;
      console.log('hola')
      // si no vacio sobrecargar
      
        cargarPuestos(puestos);
      
    }

  }


  //obtenerlo
  React.useEffect(() => {
    async function retrieveEmpleadoauto() {
      
     
      
      if (props.idEmpleado !== '') {
        
        EmpleadoService.getOne(props.idEmpleado)
          .then(response => {

            console.log(response.data)

            cargarPuestos(response.data[0].puesto)


          })
          .catch(e => {
            console.log(e);
          });

      }  


    }
    retrieveEmpleadoauto();
  }, []);




  useImperativeHandle(
    ref,
    () => ({
      refreshListPuestos() {
        actualizarEmpleado()
        }
     }),
 )



  function actualizarEmpleado() {
    EmpleadoService.getOne(props.idEmpleado)
      .then(response => {

        console.log('actualiza empleado: '+ response.data)
        cargarPuestos(response.data[0].puesto);
        

      })
      .catch(e => {
        console.log(e);
      });


  }




  function cargarPuestos(puestos) {

    
    EmpresaService.getAll()
      .then(response => {
        setPuestosAsociados(obtenerPuestos(response.data, puestos))
      })
      .catch(e => {
        console.log(e);
      });
  }



  function desasociarPuesto(idPuesto) {
    var data = {
      idPuesto: idPuesto,
    };

    swal({
      title: "Esta seguro?",
      text: "se dara de baja a este empleado del puesto!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {

          console.log('id empleado: ' + props.idEmpleado);
          console.log('data idpuesto: ' + data);
          EmpleadoService.updateWithoutWork(props.idEmpleado, data)
            .then(response => {
              //console.log(response.data);
              //eliminado correctamente msj
              setPuestosAsociados([]);
              swal("Se desasocio el puesto del empleado!", {
                icon: "success",
              });
              //actualizar tabla
              actualizarEmpleado();
              
              //this.refreshList()
            })
            .catch(e => {
              console.log(e);
              swal("Error!", "la operacion no logro realizarce", "error");
            });



        } else {
          swal("Cancelado!");
        }
      });


  }


  // tener todas las empresas con sus datos
  function obtenerPuestos(empresas, puestos) {
    let rows = [];
    console.log(puestos);
    for (let i = 0; i < empresas.length; i++) {
      if (empresas[i].areas) {
        for (let j = 0; j < empresas[i].areas.length; j++) {
          if (empresas[i].areas[j].departamentos) {
            for (let d = 0; d < empresas[i].areas[j].departamentos.length; d++) {
              if (empresas[i].areas[j].departamentos[d].puestos) {
               
                for (let p = 0; p < empresas[i].areas[j].departamentos[d].puestos.length; p++) {
                  
                  for (let c = 0; c < puestos.length; c++) {
                    console.log(puestos[c].puesto);
                    console.log(empresas[i].areas[j].departamentos[d].puestos[p]._id );
                    if (puestos[c].puesto === empresas[i].areas[j].departamentos[d].puestos[p]._id && puestos[c].activo) {
                     
                      let puesto = {
                        id: empresas[i].areas[j].departamentos[d].puestos[p]._id,
                        name: empresas[i].areas[j].departamentos[d].puestos[p].name,
                        departamentoname: empresas[i].areas[j].departamentos[d].name,
                        areaname: empresas[i].areas[j].name,
                        empresaname: empresas[i].name,
                      }
                      rows.push(puesto)



                    }
                  }


                }
              }
            }
          }
        }
      }
    }
    console.log(rows);
    return rows
  }



  return (
    <div>

      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow style={{ backgroundColor: 'rgb(174 173 191)' }}>
              <TableCell>PUESTOS</TableCell>
              <TableCell align="right">AREA</TableCell>
              <TableCell align="right">DEPARTAMENTO</TableCell>
              <TableCell align="right">EMPRESA</TableCell>

              {props.verDatos ? (
                <div></div>
              ) : (
                <TableCell align="right">OPCIONES</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {puestosAsociados.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.areaname}</TableCell>
                <TableCell align="right">{row.departamentoname}</TableCell>
                <TableCell align="right">{row.empresaname}</TableCell>

                {props.verDatos ? (
                  <div></div>
                ) : (
                  <TableCell align="right">
                    <IconButton color="secondary" onClick={() => desasociarPuesto(row.id)} style={{ padding: 0 }}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                )}



              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
                  
                  {props.verDatos ? (
                  <div></div>
                ) : (
                  <center>
                  
                              </center>
                )}



                  <br></br>

    </div>
  );




});

export default Child;

