const { categorias_conv, sumas_remunerativas } = require("../models");
const db = require("../models");
const Liquidacion = db.liquidacion;
const SubCategoriaConv = db.subcategorias_conv;
const Puesto = db.puestos;
const Convenio = db.convenios;
const Empleado = db.empleados;
const Empresa = db.empresas;


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
    var antiguedad = req.body.antiguedadAños;

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


    //Obtenemos el sueldo basico del empleado segun el puesto que ocupa.
    //Como tambien las sumas y descuentos a aplicar segun el convenio del puesto.
    
    Puesto.findById(idPuesto).populate('convenio_subcat')
    .then(data=>{
        console.log(data);
        const sueldo_basico = data.convenio_subcat.basico;
        const idConvenio = data.convenio._id;
        liquidacion.puesto = data;
        liquidacion.detalle.sueldo_basico = sueldo_basico;
        //console.log(sueldo_basico, "- - - > ", sumas_remunerativas);
        return Promise.all([sueldo_basico, idConvenio]);
        
    })
    .then(([sueldo_basico, idConvenio]) => {
        //Se toma las sumas y descuentos del convenio y se le aplica la formula correspondiente a cada caso.
        console.log(sueldo_basico, idConvenio);
        //modificamos la consulta segun las opciones basicas recibidas
        var condicion_sumas_rem = {
            $and:
                [
                    {$eq:["$$item.tipo", 'Suma Remunerativa']}
                ]
            };
        //Si no hay presentismo, ignoramos esa suma remun. y asi con los demas
        if (!presentismo)
            condicion_sumas_rem.$and.push({$ne: ["$$item.orden", "001"]});
        
        if (!hs_50 || hs_50 === 0)
            condicion_sumas_rem.$and.push({$ne: ["$$item.orden", "050"]});
        
        if (!hs_100 || hs_100 === 0)
            condicion_sumas_rem.$and.push({$ne: ["$$item.orden", "100"]});

        if (!calcularVacaciones)
            condicion_sumas_rem.$and.push({$ne: ["$$item.orden", "101"]});

            
        console.log(condicion_sumas_rem);

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
        //console.log(data[0].sumas_rem);
        detalle_liquidacion = data[0];
        var total_sumas_rem = sueldo_basico;        
        var total_descuentos_rem = 0;
        var total_descuentos_rem_sac = 0;
        var total_sumas_no_rem = 0;
        var total_descuentos_no_rem = 0;
        var hs_subtotal = 0;
        var bruto_sin_hs_extra = 0;
        var total_hs_extras_precio = 0;
        var remun_vacaciones = 0;
        //Sumas remunerativas
        detalle_liquidacion.sumas_rem.forEach((item)=>{
            //console.log("--");

            //console.log(item);
            //ajustes previo al calculo
            //Si el codigo es 002 - Antiguedad, se le agrega la cantidad de años recibida por parametro
            if (item.orden === '002') {
                if(antiguedad === 0 || !antiguedad)
                    antiguedad = 1;  
                item.cantidad = antiguedad;
            }
            
            //console.log(item.unidad * item.cantidad * sueldo_basico);
            console.log(item.sobre);
            switch (item.sobre) {
                case 'sueldo_basico':
                    item.subtotal = item.unidad * item.cantidad * sueldo_basico;
                    break;
                
                case 'sueldo_bruto_hora':
                    if(!hs_mes)
                        throw Error('falta el parametro horasMes');
                    
                    
                    //vemos si son horas 50 o 100
                    if (item.orden == '050')
                        item.cantidad = hs_50;
                    else
                        item.cantidad = hs_100;
                    
                    bruto_sin_hs_extra = total_sumas_rem - hs_subtotal;
                    total_hs_extras_precio += (((bruto_sin_hs_extra/hs_mes) + (bruto_sin_hs_extra/hs_mes) * item.unidad));
                    item.subtotal = ((bruto_sin_hs_extra/hs_mes) + (bruto_sin_hs_extra/hs_mes) * item.unidad) * item.cantidad ;
                    hs_subtotal = item.subtotal;
                    console.log("====>",sueldo_basico)
                    break;
                case 'sueldo_bruto_dia':
                    if(!diasHabiles)
                        throw Error('falta el parametro diasHabiles');
                    if(!diasTrabajados)
                        throw Error('falta el parametro diasTrabajados');
                    
                    if(item.orden == '101'){
                        item.cantidad = diasHabiles - diasTrabajados;
                        remun_vacaciones = (total_sumas_rem / diasHabiles) * item.cantidad;
                        item.subtotal = remun_vacaciones;
                        //console.log(ite);
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
            liquidacion.detalle.sueldo_basico -= remun_vacaciones;
        }
        liquidacion.detalle.sumas_rem = detalle_liquidacion.sumas_rem;
        liquidacion.detalle.total_sumas_rem = total_sumas_rem;
        
        var des_rem = JSON.parse(JSON.stringify(detalle_liquidacion.descuentos_rem));
        //Descuentos Remunerativos
        des_rem.forEach((item)=>{
            //console.log(item.unidad * item.cantidad * total_sumas_rem);
            
            if (item.sobre === 'total_sumas_rem')
                item.subtotal = item.unidad * item.cantidad * total_sumas_rem;
            else
                item.subtotal = item.unidad * item.cantidad;

            total_descuentos_rem += item.subtotal;
        });
        console.log("des rem: ", des_rem);
        liquidacion.detalle.descuentos_rem = [...des_rem];
        console.log("xd: ", liquidacion.detalle.descuentos_rem);
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
            //console.log(item.unidad * item.cantidad * total_sumas_rem);
            item.subtotal = item.unidad * item.cantidad * sacSemestre;
            total_descuentos_rem_sac += item.subtotal;
            });
            liquidacion.detalle_sac.sac_semestre = sacSemestre;
            liquidacion.detalle_sac.descuentos_rem_sac = descuentos_rem_sacc;
            liquidacion.detalle_sac.total_descuentos_rem_sac = total_descuentos_rem_sac;
        }
        console.log("xd: ", liquidacion.detalle.descuentos_rem);
        
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