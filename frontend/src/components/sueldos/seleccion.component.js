import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import EmpleadosService from '../../services/empleados.service'
import EmpresaService from '../../services/empresa.service';

const useStyles = makeStyles({
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
});


const countries = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    { code: 'AE', label: 'United Arab Emirates', phone: '971' },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'AL', label: 'Albania', phone: '355' },
    { code: 'AM', label: 'Armenia', phone: '374' },
    { code: 'AO', label: 'Angola', phone: '244' },
    { code: 'AQ', label: 'Antarctica', phone: '672' },
    { code: 'AR', label: 'Argentina', phone: '54' },
];

export default function Sueldos(props) {
    const classes = useStyles();


    const [puestos, setPuestos] = React.useState([]);
    const [valuePuesto, setValuePuesto] = React.useState(puestos[0]);
    const [inputValuePuesto, setInputValuePuesto] = React.useState('');


    const [empresas, setEmpresas] = React.useState([]);
    const [valueEmpresa, setValueEmpresa] = React.useState(empresas[0]);
    const [inputValueEmpresa, setInputValueEmpresa] = React.useState('');


    const [empleados, setEmpleados] = React.useState([]);
    const [valueEmpleado, setValueEmpleado] = React.useState(empleados[0]);
    const [inputValueEmpleado, setInputValueEmpleado] = React.useState('');

    const [convenios, setConvenios] = React.useState([{id:'768787878', name: 'Comerciantes'}]);
    const [valueConvenio, setValueConvenio] = React.useState(convenios[0]);
    const [inputValueConvenio, setInputValueConvenio] = React.useState('');

    React.useEffect(() => {
        async function retrieveEmpleados() {
            EmpleadosService.getAll()
                .then(response => {
                    setEmpleados(response.data)


                })
                .catch(e => {
                    console.log(e);
                });
        }
        retrieveEmpleados();
    }, []);

    function actualizarEmpresas(puestos) {
        //cargar empresas de los puestos
        EmpresaService.getAll()
            .then(response => {
                let puestosCompletos = obtenerPuestos(response.data, puestos);

                setEmpresas(obtenerEmpresasDePuestos(puestosCompletos));
            })
            .catch(e => {
                console.log(e);
            });


    }
    function obtenerEmpresasDePuestos(puestos) {
        console.log(puestos);
        let rows = [];
        for (let i = 0; i < puestos.length; i++) {
            let empresa = {
                id: puestos[i].idempresa,
                name: puestos[i].empresaname,
                idpuesto: puestos[i].id,
                namepuesto: puestos[i].name,
            };
            rows.push(empresa)
        }
        return rows;
    }


    function obtenerPuestos(empresas, puestos) {
        console.log(empresas);
        console.log(puestos);
        let rows = [];
        //console.log(puestos);
        for (let i = 0; i < empresas.length; i++) {
            if (empresas[i].areas) {
                for (let j = 0; j < empresas[i].areas.length; j++) {
                    if (empresas[i].areas[j].departamentos) {
                        for (let d = 0; d < empresas[i].areas[j].departamentos.length; d++) {
                            if (empresas[i].areas[j].departamentos[d].puestos) {
                                for (let p = 0; p < empresas[i].areas[j].departamentos[d].puestos.length; p++) {

                                    for (let c = 0; c < puestos.length; c++) {
                                        if (puestos[c]._id === empresas[i].areas[j].departamentos[d].puestos[p]._id) {

                                            let puesto = {
                                                id: empresas[i].areas[j].departamentos[d].puestos[p]._id,
                                                name: empresas[i].areas[j].departamentos[d].puestos[p].name,
                                                departamentoname: empresas[i].areas[j].departamentos[d].name,
                                                areaname: empresas[i].areas[j].name,
                                                empresaname: empresas[i].name,
                                                idempresa: empresas[i]._id,
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
        return rows
    }


    function cambioEmpleado(input) {
        

        setValueEmpleado(input);

        
        console.log(input);
        props.onChangeEmpleadoId(input._id);
        if(input){
        // llamar a cargar lista de empresas
        if (input.puestos.length > 0) {
            actualizarEmpresas(input.puestos);
        }
        props.onChangeEmpleadoName(input.apellido);
    }
        

    }

    function cambioEmpresa(input) {
        
        props.onChangeEmpresaId(input._id);


        setValueEmpresa(input);
        console.log(input);
        // llamar a cargar lista de puestos

        actualizarPuestos(input.id);


    }
    function actualizarPuestos(idempresa) {
        //empleado -> puestos [] [] []
        let puestosFinales = [];
        for (let i = 0; i < empresas.length; i++) {
            if (empresas[i].id === idempresa) {
                let p = {
                    id: empresas[i].idpuesto,
                    name: empresas[i].namepuesto,
                };
                puestosFinales.push(p);
            }
        }
        setPuestos(puestosFinales);
    }


    return (
        <Grid
            container
            xs={12}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
        >
            <Autocomplete
                id="country-select-empleado"
                value={valueEmpleado}
                onChange={(event, newValue) => {
                    cambioEmpleado(newValue);


                }}
                inputValue={inputValueEmpleado}
                onInputChange={(event, newInputValue) => {
                    //cambioEmpleado(newInputValue);
                    setInputValueEmpleado(newInputValue);
                }}
                style={{ width: 200, marginBottom: 10 }}
                options={empleados}
                classes={{
                    option: classes.option,
                }}
                autoHighlight
                getOptionLabel={(option) => option.apellido + ', ' + option.nombre}
                renderOption={(option) => (
                    <React.Fragment>
                        <span>{option.apellido},{option.nombre}</span>

                    </React.Fragment>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Seleccione empleado"
                        variant="outlined"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                )}
            />


            <Autocomplete
                id="country-select-empresa"
                value={valueEmpresa}
                onChange={(event, newValue) => {
                    //setValueEmpresa(newValue);
                    cambioEmpresa(newValue);

                }}
                inputValue={inputValueEmpresa}
                onInputChange={(event, newInputValue) => {
                    setInputValueEmpresa(newInputValue);
                }}
                style={{ width: 200, marginBottom: 10 }}
                options={empresas}
                classes={{
                    option: classes.option,
                }}
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(option) => (
                    <React.Fragment>
                        <span>{option.name}</span>

                    </React.Fragment>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Seleccione empresa"
                        variant="outlined"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                )}
            />
            <Autocomplete
                id="country-select-puesto" // puesto
                value={valuePuesto}
                onChange={(event, newValue) => {
                    setValuePuesto(newValue);
                    props.onChangeEmpresaId(newValue._id);

                }}
                inputValue={inputValuePuesto}
                onInputChange={(event, newInputValue) => {
                    setInputValuePuesto(newInputValue);
                }}
                style={{ width: 200, marginBottom: 10 }}
                options={puestos}
                classes={{
                    option: classes.option,
                }}
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(option) => (
                    <React.Fragment>
                        <span>{option.name}</span>

                    </React.Fragment>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Seleccione puesto"
                        variant="outlined"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                )}
            />



            

        </Grid>
    );

}
