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
    infoEmpresa: {
        fontSize: 15,
        width: '46vh'
    },
    sectionTabla: {
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5
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
        textAlign: 'right'
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
    <Document>
        <Page size="A4" >
            <View style={styles.pageSUP}>
                <Text>RECIBO DE HABERES Ley no 20.744</Text>
            </View>
            <View style={styles.page}>

                <View style={styles.logo}>
                    <Image src='https://picsum.photos/70/70' />
                </View>
                <View style={styles.infoEmpresa}>
                    <Text>Empresa kkkkkk</Text>
                    <Text>Av. Leandro N. Alem 1589</Text>
                    <Text>(1001)</Text>
                    <Text>Ciudad Autónoma de Buenos Aires</Text>
                    <Text>CUIT No xxxxxxxxxxx</Text>
                </View>
                <View style={styles.esquinaSUPderecha}>

                    <Text style={{ margin: 5, marginTop: 10, fontSize: 12 }}>DUPLICADO</Text>
                    <Text style={{ margin: 5, fontSize: 8 }}>4326</Text>

                </View>

            </View>


            <View style={styles.sectionTabla}>
                <View style={{ flexDirection: 'column', textAlign: 'center', width: '45vh' }}>
                    <View style={styles.infoSUPv2} ><Text>Apellido y Nombre</Text></View>
                    <View style={styles.infoDOWN}><Text>kkjkj hhhgh</Text></View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '20vh' }}>
                    <View style={styles.infoSUP}><Text>Legajo</Text></View>
                    <View style={styles.infoDOWN}><Text>328</Text></View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '25vh' }}>
                    <View style={styles.infoSUPv4}><Text>C.U.I.L</Text></View>
                    <View style={styles.infoDOWN}><Text>20-xxxxxxxx-1</Text></View>
                </View>
            </View>

            <View style={styles.sectionTabla}>
                <View style={{ flexDirection: 'column', textAlign: 'center', width: '40vh' }}>
                    <View style={styles.infoSUPv2}><Text>Categoria</Text></View>
                    <View style={styles.infoDOWN}><Text>Subeditor Canal Tecnología</Text></View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '25vh' }}>
                    <View style={styles.infoSUP}><Text>Division</Text></View>
                    <View style={styles.infoDOWN}><Text>ESMG -ADVERTISING</Text></View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '25vh' }}>
                    <View style={styles.infoSUPv4}><Text>Departamento</Text></View>
                    <View style={styles.infoDOWN}><Text>PRODUCTO Y CONTENIDO</Text></View>
                </View>
            </View>

            <View style={styles.sectionTabla}>
                <View style={{ flexDirection: 'column', textAlign: 'center', width: '12vh' }}>
                    <View style={styles.infoSUPv2}><Text>Fecha Ingreso</Text><Text>Dia/Mes/Año</Text></View>
                    <View style={styles.infoDOWN}><Text>11/05/2020</Text></View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '13vh' }}>
                    <View style={styles.infoSUP}><Text> </Text><Text>Sueldo</Text></View>
                    <View style={styles.infoDOWN}><Text>2400.00</Text></View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '12vh' }}>
                    <View style={styles.infoSUP}><Text>Liquidacion</Text><Text>Tipo/Mes/Año</Text></View>
                    <View style={styles.infoDOWN}><Text>MES 06 2020</Text></View>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <View style={styles.infoSUPv5}><Text style={{ alignSelf: 'center' }}>Deposito Aporte Jubilatorio</Text></View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '10.3vh' }}>
                            <View style={styles.infoSUP}><Text>Periodo</Text></View>
                            <View style={styles.infoDOWN}><Text>MAYO 2021</Text></View>
                        </View>
                        <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '11.1vh' }}>
                            <View style={styles.infoSUP}><Text>Fecha</Text></View>
                            <View style={styles.infoDOWN}><Text>07/06/2021</Text></View>
                        </View>
                        <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '11vh' }}>
                            <View style={styles.infoSUPv4}><Text>Banco</Text></View>
                            <View style={styles.infoDOWN}><Text>GALICIA</Text></View>
                        </View>
                    </View>


                </View>
            </View>
            <View style={styles.sectionTabla}>
                <View style={{ flexDirection: 'column', textAlign: 'center', width: '8vh' }}>
                    <View style={styles.infoSUPv2}><Text>Codigo</Text></View>
                    <View style={styles.infoDOWN}>
                        <Text style={styles.numerosFacturado}>3</Text>
                        <Text style={styles.numerosFacturado}>501</Text>
                        <Text style={styles.numerosFacturado}>505</Text>
                        <Text style={styles.numerosFacturado}>600</Text>
                        <Text style={styles.numerosFacturado}>610</Text>
                        <Text style={styles.numerosFacturado}>604</Text>
                        <Text style={styles.numerosFacturado}>680</Text>
                        <Text style={styles.numerosFacturado}>990</Text>
                        <Text style={styles.numerosFacturado}> </Text>
                        <Text style={styles.numerosFacturado}> </Text>
                        <Text style={styles.numerosFacturado}> </Text>
                        <Text style={styles.numerosFacturado}> </Text>
                        <Text style={styles.numerosFacturado}> </Text>

                        <Text style={styles.numerosFacturado}> </Text>

                    </View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '42vh' }}>
                    <View style={styles.infoSUP}><Text>Detalle</Text></View>
                    <View style={styles.infoDOWN}>
                        <Text style={styles.textoFacturado}>SUELDO</Text>
                        <Text style={styles.textoFacturado}>JUBILACION</Text>
                        <Text style={styles.textoFacturado}>LEY 19032</Text>
                        <Text style={styles.textoFacturado}>OSDE</Text>
                        <Text style={styles.textoFacturado}>A.N.S.S.A.L</Text>
                        <Text style={styles.textoFacturado}>DIF OSDE</Text>
                        <Text style={styles.textoFacturado}>IMPUESTO GANANCIAS</Text>
                        <Text style={styles.textoFacturado}>REDONDEO</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '14vh' }}>
                    <View style={styles.infoSUP}><Text>Cantidad</Text></View>
                    <View style={styles.infoDOWN}>
                        <Text style={styles.numerosFacturado}>30.00</Text>
                        <Text style={styles.numerosFacturado}>11.00</Text>
                        <Text style={styles.numerosFacturado}>3.00</Text>
                        <Text style={styles.numerosFacturado}>2.55</Text>
                        <Text style={styles.numerosFacturado}>0.45</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '15vh' }}>
                    <View style={styles.infoSUP}><Text>Haberes</Text></View>
                    <View style={styles.infoDOWN}>
                        <Text style={styles.numerosFacturado}>2,400.00</Text>
                        <Text> </Text>
                        <Text> </Text>
                        <Text> </Text>
                        <Text> </Text>
                        <Text> </Text>
                        <Text> </Text>
                        <Text style={styles.numerosFacturado}>-0.09</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '15vh' }}>
                    <View style={styles.infoSUPv4}><Text>Deducciones</Text></View>
                    <View style={styles.infoDOWN}>


                        <Text> </Text>
                        <Text style={styles.numerosFacturado}>-264.00</Text>
                        <Text style={styles.numerosFacturado}>-272.00</Text>
                        <Text style={styles.numerosFacturado}>-61.20</Text>
                        <Text style={styles.numerosFacturado}>-10.80</Text>
                        <Text style={styles.numerosFacturado}>-144.80</Text>
                        <Text style={styles.numerosFacturado}>-52.89</Text>
                    </View>
                </View>
            </View>


            <View style={styles.sectionTabla}>

                <View style={{ flexDirection: 'column', textAlign: 'center', width: '50vh' }}>
                    <View style={styles.infoSUPv2}><Text>Lugar y Fecha de Pago</Text></View>
                    <View style={styles.infoDOWN}>
                        <Text>BS.AS. 29/06/2001</Text>

                    </View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '14vh' }}>
                    <View style={styles.infoSUP}><Text>Tot. Remun.</Text></View>
                    <View style={styles.infoDOWN}>
                        <Text>2,400.00</Text>

                    </View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '15vh' }}>
                    <View style={styles.infoSUP}><Text>Tot. No Remun.</Text></View>
                    <View style={styles.infoDOWN}>
                        <Text>-0.09</Text>

                    </View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '15vh' }}>
                    <View style={styles.infoSUPv4}><Text>Deducciones</Text></View>
                    <View style={styles.infoDOWN}>


                        <Text> -499.81</Text>

                    </View>
                </View>
            </View>
            <View style={styles.sectionTabla}>
                <View style={{ flexDirection: 'column', textAlign: 'center', width: '40vh' }}>
                    <View style={styles.infoSUPv2} ><Text>Banco Acreditación</Text></View>
                    <View style={styles.infoDOWN}><Text>BANCO RIO</Text></View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '30vh' }}>
                    <View style={styles.infoSUP}><Text>Cuenta</Text></View>
                    <View style={styles.infoDOWN}><Text>60051219834</Text></View>
                </View>
                <View style={{ flexDirection: 'column', borderLeft: '1.5px', textAlign: 'center', width: '20vh' }}>
                    <View style={styles.infoSUPv4}><Text>Total Neto</Text></View>
                    <View style={styles.infoDOWN}><Text>1900.00</Text></View>
                </View>
            </View>


            <View style={styles.infoEscritoTotal}>
                <Text style={{ fontFamily: 'Times-Bold', fontSize: 14 }}>Son Pesos:</Text>
                <Text style={{ fontFamily: 'Courier', fontSize: 13, marginLeft: 25 }}>un mil novecientos -----------------------------------------------</Text>


            </View>

            <View style={styles.infoFirma}>
                <View style={{ width: '65vh', fontSize: 12, fontFamily: 'Courier', padding: 15  }}>
                    <Text>El presente es duplicado del recibo original que obra en
                        nuestro poder firmado por el empleado.</Text>
                </View>
                <View style={{ width: '35vh', borderLeft: '1.5px', fontFamily: 'Times-Bold', fontSize: 14, textAlign: 'center' }}>
                    <Text style={{marginTop: 50}}>Firma del Empleador </Text>
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
    
    const [dataProps, setDataProps] = React.useState(props.datosCarga);
    //console.log('ff');
    //console.log(dataProps.id);
    /**
     * 
     * {props.name}{console.log('dataProps')}
        {console.log(dataProps)}
        {console.log(dataProps.id)}
     */
    return (
        <div>
           <br></br>
            <PDFViewer style={{ width: '100%', height: '200vh' }}>
                <MyDocument
                dataProps={[dataProps]}/>
            </PDFViewer>
                



        </div>
    );
}
