import React from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TabsUtilities from './utilidades.component'
import SelectMain from './seleccion.component'
import Table from './tabla.component'
import background from "../../img/wood.png";
import Button from '@material-ui/core/Button';
import Reporte from '../reporte/pdf.component';
import { height } from 'dom-helpers';
import DatosBancarios from './datosbancarios.component';
import Divider from '@material-ui/core/Divider';
import swal from 'sweetalert';
import n_t_l from 'numeros_a_letras';
import LiquidacionService from '../../services/liquidacione.service';

const theme = createTheme();

theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
    },
};



export default function Sueldos(props) {

    const [empleadoId, setEmpleadoId] = React.useState('61a7d8080eb68f35484caa99');
    const [empresaId, setEmpresaId] = React.useState('');
    const [puestoId, setPuestoId] = React.useState('61a7dab40eb68f35484cab4c');

    const [bancoNombre, setBancoNombre] = React.useState('SANTANDER RIO');
    const [cuentaNumero, setCuentaNumero] = React.useState('60051219834');
    const [pagoFecha, setPagoFecha] = React.useState('29/12/2021');
    const [pagoLugar, setPagoLugar] = React.useState('MISIONES');

    const [periodoJubilacion, setPeriodoJubilacion] = React.useState('NOV 2021');
    const [fechaJubilacion, setFechaJubilacion] = React.useState('07/11/2021');
    const [bancoAporteJubilacion, setBancoAporteJubilacion] = React.useState('GALICIA');

    const [edad, setEdad] = React.useState('');
    const [jornadaHoras, setJornadaHoras] = React.useState('');
    const [esJubilado, setEsJubilado] = React.useState(false);
    const [calcularSac, setCalcularSac] = React.useState(false);
    const [adicionalAsistencia, setAdicionalAsistencia] = React.useState(false);
    const [incrementoSolidario, setIncrementoSolidario] = React.useState(false);
    const [aporteSolidarioOsecac, setAporteSolidarioOsecac] = React.useState(false);
    const [aporteOsecac, setAporteOsecac] = React.useState(false);
    const [antiguedadAños, setAntiguedadAños] = React.useState('');
    const [redondear, setRedondear] = React.useState('');
    const [cuotaSindical, setCuotaSindical] = React.useState('');

    const [calcularSindicato, setCalcularSindicato] = React.useState(false);
    const [calcularFAECyS, setCalcularFAECyS] = React.useState(false);
    const [adelantoSueldo, setAdelantoSueldo] = React.useState('');
    const [seguroSepelio, setSeguroSepelio] = React.useState('');

    const [porcentajeXzona, setPorcentajeXzona] = React.useState('');
    const [adicionalVidrierista, setAdicionalVidrierista] = React.useState(false);
    const [antiguedadAcumulativa, setAntiguedadAcumulativa] = React.useState(false);
    const [antiguedadComputo, setAntiguedadComputo] = React.useState('');
    const [porcentajeAntiguedadxAño, setPorcentajeAntiguedadxAño] = React.useState('');

    const [exposicionFeriado, setExposicionFeriado] = React.useState('');
    const [diasNoTrabajados, setDiasNoTrabajados] = React.useState('');
    const [criterioTrabajados, setCriterioTrabajados] = React.useState('');
    const [criterioNoTrabajados, setCriterioNoTrabajados] = React.useState('');

    const [diasTrabajados, setDiasTrabajados] = React.useState('');

    const [calcularVacaciones, setCalcularVacaciones] = React.useState(false);
    const [año, setAño] = React.useState('');
    const [diasHabiles, setDiasHabiles] = React.useState('');

    const [horasDiurnas50porciento, setHorasDiurnas50porciento] = React.useState('');
    const [horasNocturnas50porciento, setHorasNocturnas50porciento] = React.useState('');
    const [horasDiurnas100porciento, setHorasDiurnas100porciento] = React.useState('');
    const [horasNocturnas100porciento, setHorasNocturnas100porciento] = React.useState('');
    const [horasNocturnas, setHorasNocturnas] = React.useState('');

    const [diasInculpable, setDiasInculpable] = React.useState('');
    const [mesInicioInculpable, setMesInicioInculpable] = React.useState('');

    const [diasILT, setDiasILT] = React.useState('');
    const [diasACargoEmpresaILT, setDiasACargoEmpresaILT] = React.useState('');
    const [mesInicioILT, setMesInicioILT] = React.useState('');
    const [exposicionLicenciaILT, setExposicionLicenciaILT] = React.useState('');




    //hasta aca
    const [name, setName] = React.useState('oy');
    const [datosCarga, setDatosCarga] = React.useState(
        {
            nombreEmpresa: '',
            calleNumero: 'Av. Leandro N. Alem 1589',
            codigoPostal: '5869',
            provincia: 'Ciudad Autónoma de Buenos Aires',
            cuit: '23-58659965-9',

            apellidoNombre: 'Gonzales Esteban',
            legajo: '35696',
            cuil: '20-54676667-3',

            departamento: 'PRODUCTO Y CONTENIDO',
            division: 'ESMG -ADVERTISING',
            categoria: 'Subeditor Canal Tecnología',

            fechaIngreso: '11/05/2021',
            sueldo: '2400,57',
            liquidacionTipoMesAño: 'MES 11 2021',

            jubilacionPeriodo: 'MAYO 2021',
            jubilacionFecha: '07/10/2021',
            jubilacionBanco: 'GALICIA',

            conceptos: [
                {
                    codigo: '998',
                    detalle: 'SUELDAZO',
                    cantidad: '78',
                    haber: '2,400.85',
                    deduccion: '-256.00'
                },
                {
                    codigo: '998',
                    detalle: 'SUELDAZO',
                    cantidad: '78',
                    haber: '2,400.85',
                    deduccion: '-256.00'
                },
            ],
            lugarFechaPago: 'BS.AS. 29/06/2001',
            totalRemunerado: '5.587,50',
            totalNoRemunerado: '-0,09',
            totalDeduccion: '-554,75',

            bancoAcreditacion: 'BANCO RIO',
            bancoCuenta: '600512559955',
            totalNeto: '1900,75',
            totalNetoEscrito: 'un mil novecientos',

        });

    function onChangeBancoNombre(e) {
        setBancoNombre(e.target.value);
    }
    function onChangeCuentaNumero(e) {
        setCuentaNumero(e.target.value);
    }
    function onChangePagoFecha(e) {
        setPagoFecha(e.target.value);
    }
    function onChangePagoLugar(e) {
        setPagoLugar(e.target.value);
    }
    function onChangePeriodoJubilacion(e) {
        setPeriodoJubilacion(e.target.value);
    }
    function onChangeFechaJubilacion(e) {
        setFechaJubilacion(e.target.value);
    }
    function onChangeBancoAporteJubilacion(e) {
        setBancoAporteJubilacion(e.target.value);
    }










    function onChangeEdad(v) {
        setEdad(v);
    }
    function onChangeJornadaHoras(v) {
        setJornadaHoras(v);
    }
    function onChangeEsJubilado(e) {
        setEsJubilado(e.target.checked);
    }
    function onChangeCalcularSac(e) {
        setCalcularSac(e.target.checked);
    }
    function onChangeAdicionalAsistencia(e) {
        setAdicionalAsistencia(e.target.checked);
    }
    function onChangeIncrementoSolidario(e) {
        setIncrementoSolidario(e.target.checked);
    }
    function onChangeAporteSolidarioOsecac(e) {
        setAporteSolidarioOsecac(e.target.checked);
    }
    function onChangeAporteOsecac(e) {
        setAporteOsecac(e.target.checked);
    }

    function onChangeRedondear(e) {
        setRedondear(e.target.value);
    }

    function onChangeCuotaSindical(e) {
        setCuotaSindical(e.target.value);
    }

    function onChangeAntiguedadAños(e) {
        setAntiguedadAños(e.target.value);
    }

    function onChangeCalcularSindicato(e) {
        setCalcularSindicato(e.target.checked);
    }
    function onChangeCalcularFAECyS(e) {
        setCalcularFAECyS(e.target.checked);
    }
    function onChangeAdelantoSueldo(e) {
        setAdelantoSueldo(e.target.value);
    }
    function onChangeSeguroSepelio(e) {
        setSeguroSepelio(e.target.value);
    }

    function onChangeporcentajeXzona(e) {
        setPorcentajeXzona(e.target.value);
    }
    function onChangeAdicionalVidrierista(e) {
        setAdicionalVidrierista(e.target.checked);
    }
    function onChangeAntiguedadAcumulativa(e) {
        setAntiguedadAcumulativa(e.target.checked);
    }
    function onChangeAntiguedadComputo(v) {
        setAntiguedadComputo(v);
    }
    function onChangePorcentajeAntiguedadxAño(e) {
        setPorcentajeAntiguedadxAño(e.target.value);
    }



    function onChangeExposicionFeriado(v) {
        setExposicionFeriado(v);
    }
    function onChangeDiasNoTrabajados(e) {
        setDiasNoTrabajados(e.target.value);
    }
    function onChangeCriterioTrabajados(v) {
        setCriterioTrabajados(v);
    }
    function onChangeCriterioNoTrabajados(v) {
        setCriterioNoTrabajados(v);
    }


    function onChangeDiasTrabajados(e) {
        setDiasTrabajados(e.target.value);
    }


    function onChangeCalcularVacaciones(e) {
        setCalcularVacaciones(e.target.checked);
    }
    function onChangeAño(v) {
        setAño(v);
    }
    function onChangeDiasHabiles(e) {
        setDiasHabiles(e.target.value);
    }



    function onChangeHorasDiurnas50porciento(e) {
        setHorasDiurnas50porciento(e.target.value);
    }
    function onChangeHorasNocturnas50porciento(e) {
        setHorasNocturnas50porciento(e.target.value);
    }
    function onChangeHorasDiurnas100porciento(e) {
        setHorasDiurnas100porciento(e.target.value);
    }
    function onChangeHorasNocturnas100porciento(e) {
        setHorasNocturnas100porciento(e.target.value);
    }
    function onChangeHorasNocturnas(e) {
        setHorasNocturnas(e.target.value);
    }







    function onChangeDiasInculpable(v) {
        setDiasInculpable(v);
    }
    function onChangeMesInicioInculpable(e) {
        setMesInicioInculpable(e.target.value);
    }







    function onChangeDiasILT(v) {
        setDiasILT(v);
    }
    function onChangeDiasACargoEmpresaILT(e) {
        setDiasACargoEmpresaILT(e.target.value);
    }
    function onChangeMesInicioILT(v) {
        setMesInicioILT(v);
    }
    function onChangeExposicionLicenciaILT(e) {
        setExposicionLicenciaILT(e.target.value);
    }




    function onChangeEmpleadoId(e) {
        setEmpleadoId(e);
    }
    function onChangeEmpresaId(e) {
        
        setEmpresaId(e);
        console.log(empresaId);
    }
    function onChangePuestoId(e) {
        setPuestoId(e);
    }










    function clean() {
        //setEmpleadoId('');
        //setEmpresaId('');
        //setPuestoId('');

        setBancoNombre('');
        setCuentaNumero('');
        setPagoFecha('');
        setPagoLugar('');

        setPeriodoJubilacion('');
        setFechaJubilacion('');
        setBancoAporteJubilacion('');

        setEdad('');
        setJornadaHoras('');
        setEsJubilado(false);
        setCalcularSac(false);
        setAdicionalAsistencia(false);
        setIncrementoSolidario(false);
        setAporteSolidarioOsecac(false);
        setAporteOsecac(false);
        setAntiguedadAños('');
        setRedondear('');
        setCuotaSindical('');

        setCalcularSindicato(false);
        setCalcularFAECyS(false);
        setAdelantoSueldo('');
        setSeguroSepelio('');

        setPorcentajeXzona('');
        setAdicionalVidrierista(false);
        setAntiguedadAcumulativa(false);
        setAntiguedadComputo('');
        setPorcentajeAntiguedadxAño('');

        setExposicionFeriado('');
        setDiasNoTrabajados('');
        setCriterioTrabajados('');
        setCriterioNoTrabajados('');

        setDiasTrabajados('');

        setCalcularVacaciones(false);
        setAño('');
        setDiasHabiles('');

        setHorasDiurnas50porciento('');
        setHorasNocturnas50porciento('');
        setHorasDiurnas100porciento('');
        setHorasNocturnas100porciento('');
        setHorasNocturnas('');

        setDiasInculpable('');
        setMesInicioInculpable('');

        setDiasILT('');
        setDiasACargoEmpresaILT('');
        setMesInicioILT('');
        setExposicionLicenciaILT('');
    }

    function onChangeEmpleadoName(n) {
        setName(n);
    }
    function relleno(text) {

        var finalText = text + ' ';
        for (let i = finalText.length; i < 67; i++) {

            finalText = finalText + '-';

        }
        return finalText;

    }

    function cargaDetalle(detalles) {
        var listDic = [];
        var auxDic = {};

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

    function fechar(fecha) {

        let now = new Date(fecha);

        console.log(now);

        var dateString = moment(now).format('DD/MM/YYYY');
        return dateString 


    }


    function generarReporte() {
        
                if (bancoAporteJubilacion === '' || fechaJubilacion === '' || periodoJubilacion === '' || pagoLugar === '' || pagoFecha === '' || cuentaNumero === '' || bancoNombre === '') {
                    swal("Error!", "Debe completar el apartado de datos bancarios y aporte jubilatorio!", "error");
                    return 0;
                }
                if (empleadoId === '' ||  empresaId === '' || !empresaId || puestoId === '') {
                    swal("Error!", "Debe seleccionar la empresa, el empleado ye l puesto para el cual se generara la liquidacion!", "error");
                    return 0;
                }
                


        document.getElementById('reporte').style.display = 'block';
        //document.getElementById('reporte').style.display= 'none';

        var data = {
            //Datos Basicos
            empleadoId: empleadoId,
            empresaId: empresaId,
            puestoId: puestoId,

            //informacion que va en la liquidacion
            bancoNombre: bancoNombre,
            cuentaNumero: cuentaNumero,
            pagoFecha: pagoFecha,
            pagoLugar: pagoLugar,

            //informacion que va en la liquidacion
            periodoJubilacion: periodoJubilacion,
            fechaJubilacion: fechaJubilacion,
            bancoAporteJubilacion: bancoAporteJubilacion,

            //Opciones
            edad: edad, // 'Mayor' o '17 Años' o '16 Años'
            jornadaHoras: jornadaHoras, //hs semanales
            esJubilado: esJubilado,
            calcularSac: calcularSac,
            adicionalAsistencia: adicionalAsistencia,
            incrementoSolidario: incrementoSolidario,
            aporteSolidarioOsecac: aporteSolidarioOsecac,
            aporteOsecac: aporteOsecac,
            antiguedadAños: antiguedadAños,
            redondear: redondear,  // ni idea como funciona xd
            cuotaSindical: cuotaSindical, //porcentaje

            calcularSindicato: calcularSindicato,
            calcularFAECyS: calcularFAECyS,
            adelantoSueldo: adelantoSueldo,
            seguroSepelio: seguroSepelio,

            porcentajeXzona: porcentajeXzona,
            adicionalVidrierista: adicionalVidrierista,
            antiguedadAcumulativa: antiguedadAcumulativa,
            antiguedadComputo: antiguedadComputo, //'mes siguiente' o 'mes cumplido'  
            porcentajeAntiguedadxAño: porcentajeAntiguedadxAño,



            //Feriados
            exposicionFeriado: exposicionFeriado, //'diferencia' o 'sumar y restar'  
            diasNoTrabajados: diasNoTrabajados,
            criterioTrabajados: criterioTrabajados, //'Base 30/25' o 'todo base 30' o 'todo base 25'  
            criterioNoTrabajados: criterioNoTrabajados, //'base 30' o 'base 25'  

            diasTrabajados: diasTrabajados,

            //vacaciones
            calcularVacaciones: calcularVacaciones,
            año: año, //  '2020' o '2021'
            diasHabiles: diasHabiles,


            //Horas extras
            horasDiurnas50porciento: horasDiurnas50porciento,
            horasNocturnas50porciento: horasNocturnas50porciento,
            horasDiurnas100porciento: horasDiurnas100porciento,
            horasNocturnas100porciento: horasNocturnas100porciento,
            horasNocturnas: horasNocturnas,



            //Licencias
            accidenteEnfermedadInculpable: {
                dias: diasInculpable,
                mesInicio: mesInicioInculpable // lo cambio a numero?
            },

            riesgosTrabajoILT: {
                dias: diasILT,
                diasACargoEmpresa: diasACargoEmpresaILT,
                mesInicio: mesInicioILT, // lo cambio a numero?
                exposicionLicencia: exposicionLicenciaILT, //'restar dias' o 'descontar aparte' 
            },


        }
        console.log(n_t_l(255));
        console.log(data);
        //clean()

        LiquidacionService.create(data)
            .then(response => {
                console.log('obt')
                console.log(response.data)
                //actualizar pdf reporte
                // ponerlo visible           

                //swal("Correcto!", "Se agrego con exito!", "success");


                var result = {

                    nombreEmpresa: response.data.data.empresa.name,
                    calleNumero: response.data.data.empresa.calleNumero,
                    codigoPostal: response.data.data.empresa.codigoPostal,
                    provincia: response.data.data.empresa.provincia + ', ' + response.data.data.empresa.localidad,
                    cuit: response.data.data.empresa.cuit,

                    apellidoNombre: response.data.data.empleado.apellido + " " + response.data.data.empleado.nombre,
                    legajo: response.data.data.empleado.legajo,
                    cuil: response.data.data.empleado.cuil,

                    departamento: 'PRODUCTO Y CONTENIDO',
                    division: 'ESMG -ADVERTISING',
                    categoria: 'Subeditor Canal Tecnología',

                    fechaIngreso: fechar(response.data.data.empleado.createdAt),
                    sueldo: response.data.data.puesto.convenio_subcat.basico,
                    liquidacionTipoMesAño: 'MES 11 2021',

                    jubilacionPeriodo: response.data.data.jubilacion.periodoJubilacion,
                    jubilacionFecha: response.data.data.jubilacion.fechaJubilacion,
                    jubilacionBanco: response.data.data.jubilacion.bancoAporteJubilacion,

                    conceptos: cargaDetalle(response.data.data.detalle),

                    lugarFechaPago: response.data.data.datos_bancarios.pagoLugar + ' ' + response.data.data.datos_bancarios.pagoFecha,
                    totalRemunerado: parseFloat(response.data.data.detalle.total_sumas_rem).toFixed(2),
                    totalNoRemunerado: parseFloat(response.data.data.detalle.total_sumas_no_rem).toFixed(2),
                    totalDeduccion: parseFloat(response.data.data.detalle.total_descuentos_rem + response.data.data.detalle.total_descuentos_no_rem).toFixed(2),

                    bancoAcreditacion: response.data.data.datos_bancarios.bancoNombre,
                    bancoCuenta: response.data.data.datos_bancarios.cuentaNumero,

                    totalNeto: '-----',
                    totalNetoEscrito: relleno(n_t_l(145552)),  //llama para obtener el resultado final
                }
                setDatosCarga(result);

            })
            .catch(e => {
                console.log(e);
                swal("Error!", "No se logro generar liquidacion!", "error");
            });

    }

    return (
        <div style={{
            minHeight: '100vh',
            backgroundImage: `url(${background})`, backgroundSize: 'cover',
            overflow: 'hidden'
        }}>

            <br></br>

            <Grid
                container

                direction="column"
                alignItems="center"
            >

                <Grid

                    xs={12}
                    sm={11}
                    md={10}
                    lg={8}
                    xl={6}
                    direction="column"
                    alignItems="flex-start"
                >
                    <Typography variant="h5" >
                        Liquidacion mensual de Sueldos
                    </Typography>
                    <br></br>

                    <Divider />
                    <Typography variant="h6" style={{ margin: 10 }}>
                        Datos basicos:
                    </Typography>
                    <Grid>


                        <SelectMain
                            onChangeEmpleadoName={onChangeEmpleadoName}

                            onChangeEmpleadoId={onChangeEmpleadoId}
                            onChangeEmpresaId={onChangeEmpresaId}
                            onChangePuestoId={onChangePuestoId}
                        />

                    </Grid>
                    <br></br>
                    <Grid>


                        <DatosBancarios
                            onChangeBancoNombre={onChangeBancoNombre}
                            bancoNombre={bancoNombre}

                            onChangeCuentaNumero={onChangeCuentaNumero}
                            cuentaNumero={cuentaNumero}

                            onChangePagoFecha={onChangePagoFecha}
                            pagoFecha={pagoFecha}

                            onChangePagoLugar={onChangePagoLugar}
                            pagoLugar={pagoLugar}

                            onChangePeriodoJubilacion={onChangePeriodoJubilacion}
                            periodoJubilacion={periodoJubilacion}

                            onChangeFechaJubilacion={onChangeFechaJubilacion}
                            fechaJubilacion={fechaJubilacion}

                            onChangeBancoAporteJubilacion={onChangeBancoAporteJubilacion}
                            bancoAporteJubilacion={bancoAporteJubilacion}
                        />

                    </Grid>
                    <br></br>
                    <Divider />




                    <br></br>
                    <Typography variant="h6" style={{ margin: 10 }} >
                        Parametros:
                    </Typography>

                    <TabsUtilities
                        onChangeEdad={onChangeEdad}
                        edad={edad}
                        onChangeEsJubilado={onChangeEsJubilado}
                        esJubilado={esJubilado}
                        onChangeAntiguedadAños={onChangeAntiguedadAños}
                        antiguedadAños={antiguedadAños}

                        onChangeJornadaHoras={onChangeJornadaHoras}
                        jornadaHoras={jornadaHoras}
                        onChangeCalcularSac={onChangeCalcularSac}
                        calcularSac={calcularSac}
                        onChangeAdicionalAsistencia={onChangeAdicionalAsistencia}
                        adicionalAsistencia={adicionalAsistencia}
                        onChangeIncrementoSolidario={onChangeIncrementoSolidario}
                        incrementoSolidario={incrementoSolidario}
                        onChangeAporteSolidarioOsecac={onChangeAporteSolidarioOsecac}
                        aporteSolidarioOsecac={aporteSolidarioOsecac}
                        onChangeAporteOsecac={onChangeAporteOsecac}
                        aporteOsecac={aporteOsecac}
                        onChangeRedondear={onChangeRedondear}
                        redondear={redondear}
                        onChangeCuotaSindical={onChangeCuotaSindical}
                        cuotaSindical={cuotaSindical}

                        onChangeCalcularSindicato={onChangeCalcularSindicato}
                        calcularSindicato={calcularSindicato}
                        onChangeCalcularFAECyS={onChangeCalcularFAECyS}
                        calcularFAECyS={calcularFAECyS}
                        onChangeAdelantoSueldo={onChangeAdelantoSueldo}
                        adelantoSueldo={adelantoSueldo}
                        onChangeSeguroSepelio={onChangeSeguroSepelio}
                        seguroSepelio={seguroSepelio}

                        onChangeporcentajeXzona={onChangeporcentajeXzona}
                        porcentajeXzona={porcentajeXzona}
                        onChangeAdicionalVidrierista={onChangeAdicionalVidrierista}
                        adicionalVidrierista={adicionalVidrierista}
                        onChangeAntiguedadAcumulativa={onChangeAntiguedadAcumulativa}
                        antiguedadAcumulativa={antiguedadAcumulativa}
                        onChangeAntiguedadComputo={onChangeAntiguedadComputo}
                        antiguedadComputo={antiguedadComputo}
                        onChangePorcentajeAntiguedadxAño={onChangePorcentajeAntiguedadxAño}
                        porcentajeAntiguedadxAño={porcentajeAntiguedadxAño}

                        onChangeExposicionFeriado={onChangeExposicionFeriado}
                        exposicionFeriado={exposicionFeriado}
                        onChangeDiasNoTrabajados={onChangeDiasNoTrabajados}
                        diasNoTrabajados={diasNoTrabajados}
                        onChangeCriterioTrabajados={onChangeCriterioTrabajados}
                        criterioTrabajados={criterioTrabajados}
                        onChangeCriterioNoTrabajados={onChangeCriterioNoTrabajados}
                        criterioNoTrabajados={criterioNoTrabajados}

                        onChangeDiasTrabajados={onChangeDiasTrabajados}
                        diasTrabajados={diasTrabajados}

                        onChangeCalcularVacaciones={onChangeCalcularVacaciones}
                        calcularVacaciones={calcularVacaciones}
                        onChangeAño={onChangeAño}
                        año={año}
                        onChangeDiasHabiles={onChangeDiasHabiles}
                        diasHabiles={diasHabiles}


                        onChangeHorasDiurnas50porciento={onChangeHorasDiurnas50porciento}
                        horasDiurnas50porciento={horasDiurnas50porciento}
                        onChangeHorasNocturnas50porciento={onChangeHorasNocturnas50porciento}
                        horasNocturnas50porciento={horasNocturnas50porciento}
                        onChangeHorasDiurnas100porciento={onChangeHorasDiurnas100porciento}
                        horasDiurnas100porciento={horasDiurnas100porciento}
                        onChangeHorasNocturnas100porciento={onChangeHorasNocturnas100porciento}
                        horasNocturnas100porciento={horasNocturnas100porciento}
                        onChangeHorasNocturnas={onChangeHorasNocturnas}
                        horasNocturnas={horasNocturnas}

                        onChangeDiasInculpable={onChangeDiasInculpable}
                        diasInculpable={diasInculpable}
                        onChangeMesInicioInculpable={onChangeMesInicioInculpable}
                        mesInicioInculpable={mesInicioInculpable}


                        onChangeDiasILT={onChangeDiasILT}
                        diasILT={diasILT}
                        onChangeDiasACargoEmpresaILT={onChangeDiasACargoEmpresaILT}
                        diasACargoEmpresaILT={diasACargoEmpresaILT}
                        onChangeMesInicioILT={onChangeMesInicioILT}
                        mesInicioILT={mesInicioILT}
                        onChangeExposicionLicenciaILT={onChangeExposicionLicenciaILT}
                        exposicionLicenciaILT={exposicionLicenciaILT}

                    />
                    <br></br>
                    <Grid>
                        {/*
                            
                            <Table/>
                            
                            */}



                    </Grid>
                    <center>
                        <Button variant="contained" onClick={generarReporte} style={{ marginBottom: '20px', marginTop: '20px', backgroundColor: '#95f5aabf' }} >
                            GENERAR REPORTE
                        </Button>
                    </center>

                    <div id='reporte' style={{ display: 'none' }}>

                        <Reporte
                            datosCarga={datosCarga}
                        />
                    </div>






                </Grid>
            </Grid>

        </div>
    );

}
