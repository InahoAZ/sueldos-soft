const { categorias_conv, sumas_remunerativas } = require("../models");
const db = require("../models");
const Liquidacion = db.liquidacion;
const SubCategoriaConv = db.subcategorias_conv;
const Puesto = db.puestos;
const Convenio = db.convenios;
const Empleado = db.empleados;
const Empresa = db.empresas;



/** Se contempla el caso mas comun....pero hay muchas excepciones y formas pero la idea
 * tampoco es hacer un tango gestion xd.
 */
/** Params:
 * sueldo: algunos toman sueldo bruto con sumas no remun... es un gris la ley dice sueldo
 * dias_trabajados: dias trabajados si la antiguedad es menor a un año.
 * antiguedad = años. 
 */
exports.liquidarVacaciones = (sueldo, dias_trabajados, antiguedad) => {

    //Calcular días que corresponden de vacaciones segun antiguedad

    //Obtener valor dia x vacaciones = Sueldo Bruto / 25
    let valor_dia = sueldo / 25;
    let vacaciones = {
        'dias': 0,
        'valor_dia': valor_dia,
        'monto_total': 0
    }
    return vacaciones;
}

exports.liquidarFeriadosTrabajados = (sueldo, dias_trabajados) => {

    //Obtener valor dia x feriado = Sueldo Bruto / 25
    let valor_dia = sueldo / 25;

    let feriadosTrabajados = {
        'dias': dias_trabajados,
        'valor_dia': valor_dia,
        'monto_total': dias_trabajados*valor_dia
    }
    return feriadosTrabajados;
}


exports.create = (req, res) => {
    //Se valida la request
    if (!req.body) {
        res.status(400).send({ message: 'El contenido no puede estar vacio.' });
        return;
    }
    const liquidacion = {
        "empleado" : {},
        "empresa": {},
        "puesto": {},
        "detalle": {
            "sueldo_basico": 0,
            "sumas_rem": [],
            "total_sumas_rem": 0,
            "descuentos_rem":[],
            "total_descuentos_rem": 0,
            "sumas_no_rem": [],
            "total_sumas_no_rem": 0,
            "descuentos_no_rem": [],
            "total_descuentos_no_rem": 0,
        },
        "detalle_sac": {
            "sac_semestre": 0,
            "descuentos_rem_sac": [],
            "total_descuentos_rem_sac": 0,
            "diasTrabajadosSemestre": req.body.diasTrabajadosSemestre,
        },
        "datos_bancarios": {
            "bancoNombre": req.body.bancoNombre,
            "cuentaNumero": req.body.cuentaNumero,
            "pagoFecha": req.body.pagoFecha,
            "pagoLugar": req.body.pagoLugar,
        },
        "jubilacion": {
            "periodoJubilacion": req.body.periodoJubilacion,
            "fechaJubilacion": req.body.fechaJubilacion,
            "bancoAporteJubilacion": req.body.bancoAporteJubilacion,
        }
    };
    
    //recibe JSON con
    const idEmpleado = req.body.empleadoId;
    const idPuesto = req.body.puestoId;
    const idEmpresa = req.body.empresaId;
    

    //Antiguedad: Se recibe por parametro. Para versiones futuras se puede calcular a partir 
    //del tiempo del empleado en el puesto. (numero)
    let antiguedad = req.body.antiguedadAños;

    //Para saber si se contempla presentismo o no. (Si falto ese mes, no iria, 
    //o si la empresa no usa ese concepto) (boolean)
    const presentismo = req.body.adicionalAsistencia;

    //Si se calculan hs extras o no.
    const hs_50 = req.body.horas50porciento;
    const hs_100 = req.body.horas100porciento;
    //24 dias laborales * 8 hs = 200hs mes o se puede tomar 30 dias por el mes, o incluso menos horas, por eso se parametriza
    const hs_mes = req.body.horasMes;

    //Si se calculan vacaciones
    const calcularVacaciones = req.body.calcularVacaciones;
    
    const año = req.body.año;
    const diasHabiles = req.body.diasHabiles;
    const diasTrabajados = req.body.diasTrabajados;
    
    //Si se calcula SAC
    const calcularSAC = req.body.calcularSAC;
    const diasTrabajadosSemestre = req.body.diasTrabajadosSemestre;
    const diasSemestre = req.body.diasSemestre;
    //Temporalmente como parametro. TODO: buscar automaticamente el mejor sueldo del semestre.
    const mejorSueldoSemestre = req.body.mejorSueldoSemestre;
    
    //Feriados
    // const diasTrabajadosFeriados = req.body.diasTrabajadosFeriados;
    // const diasNoTrabajadosFeriados = req.body.diasNoTrabajadosFeriados;
    
    //parche hasta que esté el front xd
    const diasTrabajadosFeriados = 0;
    const diasNoTrabajadosFeriados = 1;

    //Licencias
    const nombreLicencia = req.body.accidenteEnfermedadInculpable.nombreLicencia;
    const diasLicencia = req.body.accidenteEnfermedadInculpable.diasLicencia;

    //Obtenemos el sueldo basico del empleado segun el puesto que ocupa.
    //Como tambien las sumas y descuentos a aplicar segun el convenio del puesto.
    
    Puesto.findById(idPuesto).populate('convenio_subcat')
    .then(data=>{
        const sueldo_basico = data.convenio_subcat.basico;
        const idConvenio = data.convenio._id;
        liquidacion.puesto = data;
        liquidacion.detalle.sueldo_basico = sueldo_basico;
        return Promise.all([sueldo_basico, idConvenio]);
        
    })
    .then(([sueldo_basico, idConvenio]) => {
        //Se toma las sumas y descuentos del convenio y se le aplica la formula correspondiente a cada caso.
        //modificamos la consulta segun las opciones basicas recibidas
        var condicion_sumas_rem = {
            $and:
                [
                    {$eq:["$$item.tipo", 'Suma Remunerativa']}
                ]
            };
        //Si no hay presentismo, ignoramos esa suma remun. y asi con los demas
        if (!presentismo)
            condicion_sumas_rem.$and.push({$ne: ["$$item.orden", "002"]});
        
        if (!hs_50 || hs_50 === 0)
            condicion_sumas_rem.$and.push({$ne: ["$$item.orden", "200"]});
        
        if (!hs_100 || hs_100 === 0)
            condicion_sumas_rem.$and.push({$ne: ["$$item.orden", "201"]});

        if (!calcularVacaciones)
            condicion_sumas_rem.$and.push({$ne: ["$$item.orden", "101"]});

        if (diasTrabajadosFeriados == 0 || diasTrabajadosFeriados == '')
            condicion_sumas_rem.$and.push({$ne: ["$$item.orden", "102"]});

        if (diasNoTrabajadosFeriados == 0 || diasNoTrabajadosFeriados == '')
            condicion_sumas_rem.$and.push({$ne: ["$$item.orden", "103"]});
        
        if (diasLicencia == 0 || diasLicencia == '')
            condicion_sumas_rem.$and.push({$ne: ["$$item.orden", "104"]});

        return Promise.all([Convenio.aggregate([
            {$match: {_id:idConvenio}}, 
            {$lookup: {
            from: 'sumas_descuentos',
            localField: 'sumas_descuentos',
            foreignField: '_id',
            as: 'sumasydescuentos'
            }},
            {$project: {
                sumas_no_rem:{
                    $filter: { input:'$sumasydescuentos', as:'item', cond:{$eq: ['$$item.tipo', 'Suma No Remunerativa']}}
                }, 
                sumas_rem: {
                    $filter: { input:'$sumasydescuentos', as:'item', cond:condicion_sumas_rem}
                },
                descuentos_rem: {
                    $filter: { input:'$sumasydescuentos', as:'item', cond:{$eq:["$$item.tipo", 'Descuento Remunerativo']}}
                },
                descuentos_no_rem: {
                    $filter: { input:'$sumasydescuentos', as:'item', cond:{$eq:["$$item.tipo", 'Descuento No Remunerativo']}}
                }
            }},
        ]), sueldo_basico])
        
    })
    .then(([data, sueldo_basico]) => {
        detalle_liquidacion = data[0];
        var total_sumas_rem = sueldo_basico;        
        var total_descuentos_rem = 0;
        var total_descuentos_rem_sac = 0;
        var total_sumas_no_rem = 0;
        var total_descuentos_no_rem = 0;
        var remun_vacaciones = 0;
        
        //Sumas remunerativas
        detalle_liquidacion.sumas_rem.forEach((item)=>{
            //ajustes previo al calculo
            //Si el codigo es 001 - Antiguedad, se le agrega la cantidad de años recibida por parametro
            if (item.orden === '001') {
                
                if(antiguedad === 0 || !antiguedad)
                    antiguedad = 0;  
                
                item.cantidad = antiguedad;
            }
            switch (item.sobre) {
                case 'sueldo_basico':
                    item.subtotal = item.unidad * item.cantidad * sueldo_basico;
                    break;
                case 'total_sumas_rem':
                    item.subtotal = (total_sumas_rem * item.unidad * item.cantidad)
                    break;
                case 'sueldo_bruto_hora':
                    if(!hs_mes)
                        throw Error('falta el parametro horasMes');
                    
                        //vemos si son horas 50 o 100
                    if (item.orden == '200')
                        item.cantidad = hs_50;
                    if (item.orden == '201')
                        item.cantidad = hs_100;
                    
                    valor_bruto_dia = total_sumas_rem / hs_mes;
                    item.subtotal = (valor_bruto_dia * item.unidad) * item.cantidad ;
                    break;
                case 'sueldo_bruto_dia':
                    if (calcularVacaciones){
                        if(!diasHabiles)
                            throw Error('falta el parametro diasHabiles');
                        if(!diasTrabajados)
                            throw Error('falta el parametro diasTrabajados');
                    }
                    
                    if(item.orden == '101'){ //Vacaciones
                        item.cantidad = diasHabiles - diasTrabajados;
                        remun_vacaciones = (total_sumas_rem / diasHabiles) * item.cantidad;
                        item.subtotal = remun_vacaciones;
                    }

                    if(item.orden == '102'){ //Plus Feriado Trabajado
                        let valor_dia_feriado = total_sumas_rem / 25;
                        item.cantidad = diasNoTrabajadosFeriados;
                        item.subtotal = valor_dia_feriado;
                    }

                    if(item.orden == '103'){ //Plus Feriado No Trabajado
                        if(diasNoTrabajadosFeriados != 0 || diasNoTrabajadosFeriados!='') {
                            let valor_dia = total_sumas_rem / 30;
                            let valor_dia_feriado = total_sumas_rem / 25;
                            let plus_feriado = valor_dia_feriado - valor_dia;
                            item.cantidad = diasNoTrabajadosFeriados;
                            item.subtotal = plus_feriado;
                        }   
                    }
                    if(item.orden == '104'){ //Licencia
                        let valor_dia = total_sumas_rem / 30;
                        let valor_dia_licencia = total_sumas_rem / 25;
                        let plus_licencia = valor_dia_licencia - valor_dia;
                        item.cantidad = diasLicencia;
                        item.name = nombreLicencia;
                        item.subtotal = plus_licencia * diasLicencia;
                    }
                    
                    break;
                default:
                    item.subtotal = item.unidad * item.cantidad;
                    break;
            }            
            total_sumas_rem += item.subtotal;
        });
        //Al sueldo basico se paga sobre los dias trabajados unicamente. dias de vac. se liquida aparte
        if (calcularVacaciones){
            sueldo_dia = liquidacion.detalle.sueldo_basico / 30
            liquidacion.detalle.sueldo_basico = sueldo_dia * diasTrabajados;
        }
        liquidacion.detalle.sumas_rem = detalle_liquidacion.sumas_rem;
        liquidacion.detalle.total_sumas_rem = total_sumas_rem;
        var des_rem = JSON.parse(JSON.stringify(detalle_liquidacion.descuentos_rem));
        //Descuentos Remunerativos
        des_rem.forEach((item)=>{            
            if (item.sobre === 'total_sumas_rem')
                item.subtotal = item.unidad * item.cantidad * total_sumas_rem;
            else
                item.subtotal = item.unidad * item.cantidad;

            total_descuentos_rem += item.subtotal;
        });
        liquidacion.detalle.descuentos_rem = [...des_rem];
        liquidacion.detalle.total_descuentos_rem = total_descuentos_rem;

        //Sumas No Remunerativas
        detalle_liquidacion.sumas_no_rem.forEach((item)=>{
            item.subtotal = item.unidad * item.cantidad;
            total_sumas_no_rem += item.subtotal;
        });

        liquidacion.detalle.sumas_no_rem = detalle_liquidacion.sumas_no_rem;
        liquidacion.detalle.total_sumas_no_rem = total_sumas_no_rem;

        //Descuentos No Remunerativas
        detalle_liquidacion.descuentos_no_rem.forEach((item)=>{
            item.subtotal = item.unidad * item.cantidad * total_sumas_no_rem;
            total_descuentos_no_rem += item.subtotal;
        });

        liquidacion.detalle.descuentos_no_rem = detalle_liquidacion.descuentos_no_rem;
        liquidacion.detalle.total_descuentos_no_rem = total_descuentos_no_rem;

        

        //Si hay que calcular sac, aplicamos los descuentos remunerativos neuvamente a la segunda liquidacion
        if (calcularSAC){
            var descuentos_rem_sacc = JSON.parse(JSON.stringify(detalle_liquidacion.descuentos_rem));
            sacSemestre = ((mejorSueldoSemestre * 0.5) / diasSemestre) * diasTrabajadosSemestre;
            //Descuentos Remunerativos
            descuentos_rem_sacc.forEach((item)=>{
            item.subtotal = item.unidad * item.cantidad * sacSemestre;
            total_descuentos_rem_sac += item.subtotal;
            });
            liquidacion.detalle_sac.sac_semestre = sacSemestre;
            liquidacion.detalle_sac.descuentos_rem_sac = descuentos_rem_sacc;
            liquidacion.detalle_sac.total_descuentos_rem_sac = total_descuentos_rem_sac;
        }
        
        return Empleado.findById(idEmpleado);

    })
    .then(data => {
        liquidacion.empleado = data;
        return Empresa.findById(idEmpresa).select("-areas");
        
    })
    .then(data =>{
        liquidacion.empresa = data;
        //console.log(liquidacion);
        res.send({"data":liquidacion});
    })
    .catch(err => {
        console.log("err: ", err);
    })

    
    /* //Se crea la liquidacion con lo recibido
    const liquidacion = new Empresa({
        name: req.body.name,
        areas: [],
    });

    //Se guarda la Empresa en la db
    empresa
        .save(empresa)
        .then(data => {
            console.log('data: ', data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
 */
};

// guardar una liquidacion visualizada
exports.save = (req, res) => {
    console.log("xd: "+req.body.data);
    //Validaciones
    if (!req.body.data) {
        res.status(400).send(({ message: "El contenido no puede estar vacio"}))
    }

    //Creamos el item
    const liquidacion = new Liquidacion({
        empleado: req.body.data.empleado,
        empresa: req.body.data.empresa,
        puesto: req.body.data.puesto,
        detalle: req.body.data.detalle,
        datos_bancarios: req.body.data.datos_bancarios,
        jubilacion:req.body.data.jubilacion,
        detalle_sac: req.body.data.detalle_sac,
    });

    //Guardamos en la bd
    liquidacion
        .save(liquidacion)
        .then(data => {
            res.send(data);
        })
        .catch( err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al guardar la liquidacion"
            })
        })
};


exports.findAll = (req, res) => {
    Liquidacion.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    Empresa.findById(id).populate('areas')
        .then(data => {
            if (!data)
                res.status(404).send({ message: "No se encontro una Empresa con ese Id." });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message })
        })
};


exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Los campos para actualizar no pueden estar vacios"
        });
    }

    const id = req.params.id;

    Empresa.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data)
                res.status(404).send({ message: "No se encontro una Empresa con ese Id." });
            else res.send({ message: "Empresa Actualizada", id: data.id });
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message })
        })
};


exports.delete = (req, res) => {
    const id = req.params.id;
    Empresa.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "No se encontro la empresa con ese id."
                });
            } else {
                res.send({
                    message: "La empresa se borró correctamente."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la empresa " + err.message
            });
        });
};


exports.deleteAll = (req, res) => {

};


exports.findAllPublished = (req, res) => {

};