import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import TablePagination from '@material-ui/core/TablePagination';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import LiquidacionService from '../../services/liquidacione.service';
import LiquidacionReporte from '../reporte/pdf.component'
import n_t_l from 'numeros_a_letras';
const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 540,
    },
});


export default function Liquidaciones(props) {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState(props.listaFinalByCuil);

    const [calcularSac, setCalcularSac] = React.useState(false);

    const [datosCargaSac, setDatosCargaSac] = React.useState(
        {
            numeroID: '7',
            nombreEmpresa: '-------------',
            calleNumero: '--------',
            codigoPostal: '------',
            provincia: '--------------------',
            cuit: '----------',

            apellidoNombre: '-----------',
            legajo: '----',
            cuil: '---------',

            departamento: '------------',
            division: '------------',
            categoria: '-------------',

            fechaIngreso: '--------',
            sueldo: '------',
            liquidacionTipoMesAño: '--------',

            jubilacionPeriodo: '------',
            jubilacionFecha: '------',
            jubilacionBanco: '------',

            conceptos: [
                {
                    codigo: '---',
                    detalle: '-------',
                    cantidad: '--',
                    haber: '-------',
                    deduccion: '-----'
                },
                {
                    codigo: '---',
                    detalle: '-------',
                    cantidad: '--',
                    haber: '-------',
                    deduccion: '-------'
                },
            ],
            lugarFechaPago: '-------------',
            totalRemunerado: '--------',
            totalNoRemunerado: '-----',
            totalDeduccion: '------',

            bancoAcreditacion: '-------',
            bancoCuenta: '-------------',
            totalNeto: '----',
            totalNetoEscrito: '------------',

        });

    const [datosCarga, setDatosCarga] = React.useState(
        {
            numeroID: '3',
            nombreEmpresa: '-------------',
            calleNumero: '--------',
            codigoPostal: '------',
            provincia: '--------------------',
            cuit: '----------',

            apellidoNombre: '-----------',
            legajo: '----',
            cuil: '---------',

            departamento: '------------',
            division: '------------',
            categoria: '-------------',

            fechaIngreso: '--------',
            sueldo: '------',
            liquidacionTipoMesAño: '--------',

            jubilacionPeriodo: '------',
            jubilacionFecha: '------',
            jubilacionBanco: '------',

            conceptos: [
                {
                    codigo: '---',
                    detalle: '-------',
                    cantidad: '--',
                    haber: '-------',
                    deduccion: '-----'
                },
                {
                    codigo: '---',
                    detalle: '-------',
                    cantidad: '--',
                    haber: '-------',
                    deduccion: '-------'
                },
            ],
            lugarFechaPago: '-------------',
            totalRemunerado: '--------',
            totalNoRemunerado: '-----',
            totalDeduccion: '------',

            bancoAcreditacion: '-------',
            bancoCuenta: '-------------',
            totalNeto: '----',
            totalNetoEscrito: '------------',

        });

    React.useEffect(() => {
        if (props.listaFinalByCuil) {
            console.log(props.listaFinalByCuil);
            setRows(props.listaFinalByCuil);




        }
    }, [props.listaFinalByCuil]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
   

    function fechar(fecha) {
        let now = new Date(fecha);

        // console.log(now);

        var dateString = moment(now).format('DD/MM/YYYY');
        return dateString


    }
    function mesNumero(fecha) {
        //console.log(fecha);
        var fecha = fecha[3] + fecha[4] + ' ' + fecha[6] + fecha[7] + fecha[8] + fecha[9];
        return fecha
    }
    function cargaDetalle(detalles) {
        var listDic = [];
        var auxDic = {};

        auxDic = {
            codigo: '000',
            detalle: 'Basico',
            cantidad: '30',
            haber: parseFloat(detalles.sueldo_basico).toFixed(2),
            deduccion: '',
        }
        listDic.push(auxDic);



        for (let i = 0; i < detalles.sumas_rem.length; i++) {
            auxDic = {
                codigo: detalles.sumas_rem[i].orden,
                detalle: detalles.sumas_rem[i].name,
                cantidad: detalles.sumas_rem[i].cantidad,
                haber: parseFloat(detalles.sumas_rem[i].subtotal).toFixed(2),
                deduccion: ''
            }
            listDic.push(auxDic);
        }

        for (let i = 0; i < detalles.descuentos_rem.length; i++) {
            auxDic = {
                codigo: detalles.descuentos_rem[i].orden,
                detalle: detalles.descuentos_rem[i].name,
                cantidad: detalles.descuentos_rem[i].cantidad,
                haber: '',
                deduccion: parseFloat(detalles.descuentos_rem[i].subtotal).toFixed(2),
            }
            listDic.push(auxDic);
        }

        for (let i = 0; i < detalles.sumas_no_rem.length; i++) {
            auxDic = {
                codigo: detalles.sumas_no_rem[i].orden,
                detalle: detalles.sumas_no_rem[i].name,
                cantidad: detalles.sumas_no_rem[i].cantidad,
                haber: parseFloat(detalles.sumas_no_rem[i].subtotal).toFixed(2),
                deduccion: ''
            }
            listDic.push(auxDic);
        }

        for (let i = 0; i < detalles.descuentos_no_rem.length; i++) {
            auxDic = {
                codigo: detalles.descuentos_no_rem[i].orden,
                detalle: detalles.descuentos_no_rem[i].name,
                cantidad: detalles.descuentos_no_rem[i].cantidad,
                haber: '',
                deduccion: parseFloat(detalles.descuentos_no_rem[i].subtotal).toFixed(2),
            }
            listDic.push(auxDic);
        }

        listDic.sort(function (a, b) {
            return a.codigo - b.codigo;
        });
        return listDic

    }
    function getDetalleTipoSac() {

        let now = new Date();
        let year = '';
        var dateString = moment(now).format('DD/MM/YYYY');
        year = dateString[6] + dateString[7] + dateString[8] + dateString[9];
        var number = parseInt(dateString[3] + dateString[4]);
        if (number < 7) {
            return '1er S.A.C.' + year;
        } else {
            return '2do S.A.C.' + year;
        }

    }
    function obtenerDetalleSac(detalles) {
        var listDic = [];
        var auxDic = {};
        auxDic = {
            codigo: '000',
            detalle: getDetalleTipoSac(),
            cantidad: '',
            haber: parseFloat(detalles.sac_semestre).toFixed(2),
            deduccion: '',
        }
        listDic.push(auxDic);
        for (let i = 0; i < detalles.descuentos_rem_sac.length; i++) {
            auxDic = {
                codigo: detalles.descuentos_rem_sac[i].orden,
                detalle: detalles.descuentos_rem_sac[i].name,
                cantidad: detalles.descuentos_rem_sac[i].cantidad,
                haber: '',
                deduccion: parseFloat(detalles.descuentos_rem_sac[i].subtotal).toFixed(2),
            }
            listDic.push(auxDic);
        }
        listDic.sort(function (a, b) {
            return a.codigo - b.codigo;
        });
        return listDic
    }
    function relleno(text) {

        var finalText = text + ' ';
        for (let i = finalText.length; i < 67; i++) {

            finalText = finalText + '-';

        }
        return finalText;

    }

    function verReporte(oneReport) {


        var result = {
            numeroID: '2',

            nombreEmpresa: oneReport.empresa.name,
            calleNumero: oneReport.empresa.calleNumero,
            codigoPostal: oneReport.empresa.codigoPostal,
            provincia: oneReport.empresa.provincia + ', ' + oneReport.empresa.localidad,
            cuit: oneReport.empresa.cuit,

            apellidoNombre: oneReport.empleado.apellido + " " + oneReport.empleado.nombre,
            legajo: oneReport.empleado.legajo,
            cuil: oneReport.empleado.cuil,

            departamento: oneReport.puesto.departamentoName,
            division: oneReport.puesto.areaName,
            categoria: oneReport.puesto.name,

            fechaIngreso: fechar(oneReport.empleado.createdAt),
            sueldo: oneReport.puesto.convenio_subcat.basico,
            liquidacionTipoMesAño: 'MES ' + mesNumero(oneReport.jubilacion.fechaJubilacion),

            jubilacionPeriodo: oneReport.jubilacion.periodoJubilacion,
            jubilacionFecha: oneReport.jubilacion.fechaJubilacion,
            jubilacionBanco: oneReport.jubilacion.bancoAporteJubilacion,

            conceptos: cargaDetalle(oneReport.detalle),

            lugarFechaPago: oneReport.datos_bancarios.pagoLugar + ' ' + oneReport.datos_bancarios.pagoFecha,
            totalRemunerado: parseFloat(oneReport.detalle.total_sumas_rem).toFixed(2),
            totalNoRemunerado: parseFloat(oneReport.detalle.total_sumas_no_rem).toFixed(2),
            totalDeduccion: parseFloat(oneReport.detalle.total_descuentos_rem + oneReport.detalle.total_descuentos_no_rem).toFixed(2),

            bancoAcreditacion: oneReport.datos_bancarios.bancoNombre,
            bancoCuenta: oneReport.datos_bancarios.cuentaNumero,
            // (remun - (descuetnos remun + descuento no remu)) + no remu
            totalNeto: parseFloat((oneReport.detalle.total_sumas_rem - (oneReport.detalle.total_descuentos_rem + oneReport.detalle.total_descuentos_no_rem)) + oneReport.detalle.total_sumas_no_rem).toFixed(2),
            totalNetoEscrito: relleno(n_t_l(parseInt((oneReport.detalle.total_sumas_rem - (oneReport.detalle.total_descuentos_rem + oneReport.detalle.total_descuentos_no_rem)) + oneReport.detalle.total_sumas_no_rem))),  //llama para obtener el resultado final
        }
        var objCopy = { ...result };
        setDatosCarga(objCopy);

        if (oneReport.detalle_sac.descuentos_rem_sac.length > 0) {
            setCalcularSac(true);

            result["conceptos"] = obtenerDetalleSac(oneReport.detalle_sac);

            result["jubilacionPeriodo"] = "";
            result["jubilacionFecha"] = "";
            result["jubilacionBanco"] = "";

            result["totalRemunerado"] = parseFloat(oneReport.detalle_sac.sac_semestre).toFixed(2);
            result["totalNoRemunerado"] = "";
            result["totalDeduccion"] = parseFloat(oneReport.detalle_sac.total_descuentos_rem_sac).toFixed(2);
            result["totalNeto"] = parseFloat(oneReport.detalle_sac.sac_semestre - oneReport.detalle_sac.total_descuentos_rem_sac).toFixed(2);
            result["totalNetoEscrito"] = relleno(n_t_l(parseInt(oneReport.detalle_sac.sac_semestre - oneReport.detalle_sac.total_descuentos_rem_sac)));

            setDatosCargaSac(result);
        }else{
            setCalcularSac(false);
        }
        

    }


    React.useEffect(() => {
        async function obtenerLiquidaciones() {
            LiquidacionService.getAll()
                .then(response => {
                    console.log(response.data);
                    //setRows(response.data)


                })
                .catch(e => {
                    console.log(e);
                });
        }
        obtenerLiquidaciones();
    }, []);


    return (

        <div>



            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Identificador</TableCell>
                                <TableCell align="center">Empresa</TableCell>
                                <TableCell align="center">Fecha de pago</TableCell>
                                <TableCell align="center">Total neto</TableCell>



                                <TableCell align="right">Opciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        <TableCell component="th" scope="row">
                                            {row._id}
                                        </TableCell>
                                        <TableCell align="center">{row.empresa.name}</TableCell>
                                        <TableCell align="center">{row.datos_bancarios.pagoFecha}</TableCell>
                                        <TableCell align="center">{parseFloat((row.detalle.total_sumas_rem - (row.detalle.total_descuentos_rem + row.detalle.total_descuentos_no_rem)) + row.detalle.total_sumas_no_rem).toFixed(2)}</TableCell>

                                        <TableCell align="right">

                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="flex-end"
                                                alignItems="center"
                                            >


                                                <Grid>
                                                    <IconButton color="secondary" onClick={() => verReporte(row)}>
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>





            <LiquidacionReporte
                key='9'
                datosCarga={datosCarga}
            />
            {calcularSac &&
                <LiquidacionReporte
                    key='78'
                    datosCarga={datosCargaSac}
                />
            }





        </div>

    );

}