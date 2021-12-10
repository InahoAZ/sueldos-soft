import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import background from '../../img/wood.png'
import { Page, Text, Image, View, Document, StyleSheet } from '@react-pdf/renderer';

import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

const theme = createTheme();



// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        marginBottom: 15

    },
    pageSUP: {

        alignItems: 'flex-end',
        paddingRight: 8,
        paddingTop: 8,
        fontSize: 16,
        width: '100%',
        textAlign: 'right',

    },
    section: {
        margin: 10,
        border: '1px',
        padding: 10,
        flexGrow: 1
    },
    logo: {
        margin: 20,
        marginTop: 0,
        height: 70,
        width: 70
    },
    esquinaSUPderecha: {
        alignItems: 'flex-end'
    },
    infoEmpresaWithoutLogo:{
        fontSize: 15,
        marginLeft: 20,
        width: '56vh'
    },
    infoEmpresa: {
        fontSize: 15,
        width: '46vh'
    },
    sectionTabla: {
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5
    },
    sectionTablaConceptos: {
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5,
        height: '42%',
    },
    infoSUP: {
        fontSize: 13,
        fontFamily: 'Times-Bold',
        backgroundColor: '#bcbdc0',
        borderTop: '1.5px',
        borderBottom: '1.5px',
        borderLeft: 0,
        padding: 2
    },
    infoSUPv2: {
        fontSize: 13,
        fontFamily: 'Times-Bold',
        backgroundColor: '#bcbdc0',
        borderTop: '1.5px',
        borderBottom: '1.5px',
        borderLeft: '1.5px',
        padding: 2
    },
    infoSUPv4: {
        fontSize: 13,
        fontFamily: 'Times-Bold',
        backgroundColor: '#bcbdc0',
        borderTop: '1.5px',
        borderBottom: '1.5px',
        borderRight: '1.5px',
        padding: 2
    },
    infoSUPv5: {
        fontSize: 13,
        fontFamily: 'Times-Bold',
        backgroundColor: '#bcbdc0',
        border: '1.5px',
        borderBottom: 0
    },
    infoDOWN: {
        fontSize: 13,
        fontFamily: 'Courier',

        padding: 4
    },
    bordeL: {
        borderLeft: '1.5px'
    },
    textoFacturado: {
        padding: 3.5,
        textAlign: 'left'
    },
    numerosFacturado: {
        padding: 3.5,
        minHeight: '21px',
        textAlign: 'right'
    },
    numerosFacturadoSpace: {
        padding: 3.5,
        minHeight: '21px',
        textAlign: 'right',
        marginBottom: '16px'
    },
    infoEscritoTotal: {
        marginLeft: 5,
        padding: 3.5,
        marginRight: 5,
        border: '1.5px'
    },
    infoFirma: {
        marginLeft: 5,
        flexDirection: 'row',
        padding: 3.5,
        marginRight: 5,
        border: '1.5px',
        borderTop: 0
    }
});

// Create Document Component
const MyDocument = (props) => (
    <Document
    key={props.datosCarga.numeroID}
    >
        <Page size="A4" >
            <View style={styles.pageSUP}>
                <Text>RECIBO DE HABERES Ley no 20.744</Text>
            </View>
            <View style={styles.page}>
{/*
para tener logo, descomentar esto y comentar el "view" siguiente de abajo
<View style={styles.logo}>
                    <Image src='https://picsum.photos/70/70' />
                </View>
                <View style={styles.infoEmpresa}>
                    <Text>Empresa {props.datosCarga.nombreEmpresa}</Text>
                    <Text>{props.datosCarga.calleNumero}</Text>
                    <Text>({props.datosCarga.codigoPostal})</Text>
                    <Text>{props.datosCarga.provincia}</Text>
                    <Text>CUIT No {props.datosCarga.cuit}</Text>
                </View>

*/}
                
                <View style={styles.infoEmpresaWithoutLogo}>
                    <Text>Empresa {props.datosCarga.nombreEmpresa}</Text>
                    <Text>{props.datosCarga.calleNumero}</Text>
                    <Text>({props.datosCarga.codigoPostal})</Text>
                    <Text>{props.datosCarga.provincia}</Text>
                    <Text>CUIT No {props.datosCarga.cuit}</Text>
                </View>

                <View style={styles.esquinaSUPderecha}>

                    <Text style={{ margin: 5, marginTop: 10, marginRight:25, fontSize: 12  }}>{props.datosCarga.duplicado}</Text>
                    <Text style={{ margin: 5, marginRight:25, fontSize: 8 }}>{props.datosCarga.numeroID}</Text>

                </View>

            </View>


            <View style={styles.sectionTabla}>
                <View style={{ flexDirection: 'column', textAlign: 'center', width: '45vh' }}>
                    <View style={styles.infoSUPv2} ><Text>Apellido y Nombre</Text></View>
                    <View style={styles.infoDOWN}><Text>{props.datosCarga.apellidoNombre}</Text></View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '20vh' }}>
                    <View style={styles.infoSUP}><Text>Legajo</Text></View>
                    <View style={styles.infoDOWN}><Text>{props.datosCarga.legajo}</Text></View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '25vh' }}>
                    <View style={styles.infoSUPv4}><Text>C.U.I.L</Text></View>
                    <View style={styles.infoDOWN}><Text>{props.datosCarga.cuil}</Text></View>
                </View>
            </View>

            <View style={styles.sectionTabla}>
                <View style={{ flexDirection: 'column', textAlign: 'center', width: '40vh' }}>
                    <View style={styles.infoSUPv2}><Text>Categoria</Text></View>
                    <View style={styles.infoDOWN}><Text>{props.datosCarga.categoria}</Text></View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '25vh' }}>
                    <View style={styles.infoSUP}><Text>Division</Text></View>
                    <View style={styles.infoDOWN}><Text>{props.datosCarga.division}</Text></View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '25vh' }}>
                    <View style={styles.infoSUPv4}><Text>Departamento</Text></View>
                    <View style={styles.infoDOWN}><Text>{props.datosCarga.departamento}</Text></View>
                </View>
            </View>

            <View style={styles.sectionTabla}>
                <View style={{ flexDirection: 'column', textAlign: 'center', width: '12vh' }}>
                    <View style={styles.infoSUPv2}><Text>Fecha Ingreso</Text><Text>Dia/Mes/Año</Text></View>
                    <View style={styles.infoDOWN}><Text>{props.datosCarga.fechaIngreso}</Text></View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '13vh' }}>
                    <View style={styles.infoSUP}><Text> </Text><Text>Sueldo</Text></View>
                    <View style={styles.infoDOWN}><Text>{props.datosCarga.sueldo}</Text></View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '12vh' }}>
                    <View style={styles.infoSUP}><Text>Liquidacion</Text><Text>Tipo/Mes/Año</Text></View>
                    <View style={styles.infoDOWN}><Text>{props.datosCarga.liquidacionTipoMesAño}</Text></View>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <View style={styles.infoSUPv5}><Text style={{ alignSelf: 'center' }}>Deposito Aporte Jubilatorio</Text></View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '10.3vh' }}>
                            <View style={styles.infoSUP}><Text>Periodo</Text></View>
                            <View style={styles.infoDOWN}><Text>{props.datosCarga.jubilacionPeriodo}</Text></View>
                        </View>
                        <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '11.1vh' }}>
                            <View style={styles.infoSUP}><Text>Fecha</Text></View>
                            <View style={styles.infoDOWN}><Text>{props.datosCarga.jubilacionFecha}</Text></View>
                        </View>
                        <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '11vh' }}>
                            <View style={styles.infoSUPv4}><Text>Banco</Text></View>
                            <View style={styles.infoDOWN}><Text>{props.datosCarga.jubilacionBanco}</Text></View>
                        </View>
                    </View>


                </View>
            </View>
            {props.datosCarga.conceptos ? (<View style={styles.sectionTablaConceptos} >
                <View style={{ flexDirection: 'column', textAlign: 'center', width: '8vh' }}>
                    <View style={styles.infoSUPv2}><Text>Codigo</Text></View>
                    <View style={styles.infoDOWN}>

                        {props.datosCarga.conceptos.map(function (d, idx) {
                            if (d.detalle.length < 33) {
                                return(<Text style={styles.numerosFacturado}>{d.codigo}</Text>);
                            }else{
                                return (<Text style={styles.numerosFacturadoSpace}>{d.codigo}</Text>);
                            }
                            
                        })}
                    </View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '42vh' }}>
                    <View style={styles.infoSUP}><Text>Detalle</Text></View>
                    <View style={styles.infoDOWN}>

                      
                     
                       
                        {props.datosCarga.conceptos.map(function (d, idx) {
                            return (<Text style={styles.textoFacturado}>{d.detalle}</Text>)
                        })}
                       
                       



                    </View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '14vh' }}>
                    <View style={styles.infoSUP}><Text>Cantidad</Text></View>
                    <View style={styles.infoDOWN}>

                    {props.datosCarga.conceptos.map(function (d, idx) {
                            if (d.detalle.length < 33) {
                                return(<Text style={styles.numerosFacturado}>{d.cantidad}</Text>);
                            }else{
                                return (<Text style={styles.numerosFacturadoSpace}>{d.cantidad}</Text>);
                            }
                            
                        })}
                    </View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '15vh' }}>
                    <View style={styles.infoSUP}><Text>Haberes</Text></View>
                    <View style={styles.infoDOWN}>

                    {props.datosCarga.conceptos.map(function (d, idx) {
                            if (d.detalle.length < 33) {
                                return(<Text style={styles.numerosFacturado}>{d.haber}</Text>);
                            }else{
                                return (<Text style={styles.numerosFacturadoSpace}>{d.haber}</Text>);
                            }
                            
                        })}
                    </View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '15vh' }}>
                    <View style={styles.infoSUPv4}><Text>Deducciones</Text></View>
                    <View style={styles.infoDOWN}>
                        {props.datosCarga.conceptos.map(function (d, idx) {
                            if (d.detalle.length < 33) {
                                return(<Text style={styles.numerosFacturado}>{d.deduccion}</Text>);
                            }else{
                                return (<Text style={styles.numerosFacturadoSpace}>{d.deduccion}</Text>);
                            }
                            
                        })}
                    </View>
                </View>
            </View>

            ) : (<div></div>)}

            <View style={styles.sectionTabla}>

                <View style={{ flexDirection: 'column', textAlign: 'center', width: '50vh' }}>
                    <View style={styles.infoSUPv2}><Text>Lugar y Fecha de Pago</Text></View>
                    <View style={styles.infoDOWN}>
                        <Text>{props.datosCarga.lugarFechaPago}</Text>

                    </View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '14vh' }}>
                    <View style={styles.infoSUP}><Text>Tot. Remun.</Text></View>
                    <View style={styles.infoDOWN}>
                        <Text>{props.datosCarga.totalRemunerado}</Text>

                    </View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '15vh' }}>
                    <View style={styles.infoSUP}><Text>Tot. No Remun.</Text></View>
                    <View style={styles.infoDOWN}>
                        <Text>{props.datosCarga.totalNoRemunerado}</Text>

                    </View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '15vh' }}>
                    <View style={styles.infoSUPv4}><Text>Deducciones</Text></View>
                    <View style={styles.infoDOWN}>


                        <Text>{props.datosCarga.totalDeduccion}</Text>

                    </View>
                </View>
            </View>
            <View style={styles.sectionTabla}>
                <View style={{ flexDirection: 'column', textAlign: 'center', width: '40vh' }}>
                    <View style={styles.infoSUPv2} ><Text>Banco Acreditación</Text></View>
                    <View style={styles.infoDOWN}><Text>{props.datosCarga.bancoAcreditacion}</Text></View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '30vh' }}>
                    <View style={styles.infoSUP}><Text>Cuenta</Text></View>
                    <View style={styles.infoDOWN}><Text>{props.datosCarga.bancoCuenta}</Text></View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '20vh' }}>
                    <View style={styles.infoSUPv4}><Text>Total Neto</Text></View>
                    <View style={styles.infoDOWN}><Text>{props.datosCarga.totalNeto}</Text></View>
                </View>
            </View>


            <View style={styles.infoEscritoTotal}>
                <Text style={{ fontFamily: 'Times-Bold', fontSize: 14 }}>Son Pesos:</Text>


                {
                    props.datosCarga.totalNetoEscrito ? (
                        <Text style={{ fontFamily: 'Courier', fontSize: 13, marginLeft: 25 }}>
                            {props.datosCarga.totalNetoEscrito}
                        </Text>
                    ) : (
                        <Text style={{ fontFamily: 'Courier', fontSize: 13, marginLeft: 25 }}>
                            '--------------------------------------------------------------------'
                        </Text>
                    )
                }



            </View>

            <View style={styles.infoFirma}>
                <View style={{ width: '65vh', fontSize: 12, fontFamily: 'Courier', padding: 15 }}>
                    <Text>El presente es duplicado del recibo original que obra en
                        nuestro poder firmado por el empleado.</Text>
                </View>
                <View style={{ width: '35vh', borderLeft: '1.5px', fontFamily: 'Times-Bold', fontSize: 14, textAlign: 'center' }}>
                    <Text style={{ marginTop: 50 }}>Firma del Empleador </Text>
                </View>
            </View>



        </Page>

    </Document>
);

theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
    },
};

export default function Reporte(props) {

    //console.log('ff');
    //console.log(dataProps.id);
    /**
     * 
     * {props.name}{console.log('dataProps')}
        {console.log(dataProps)}
        {console.log(dataProps.id)}
     */
    //console.log(dataProps);
    console.log(props.datosCarga.numeroID);
    return (
        <div>
            <br></br>
            <PDFViewer style={{ width: '100%', height: '200vh' }}>
                <MyDocument
                    datosCarga={props.datosCarga} />
            </PDFViewer>




        </div>
    );
}
