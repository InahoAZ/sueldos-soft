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

    //Obtenemos el sueldo basico del empleado segun el puesto que ocupa.
    //Como tambien las sumas y descuentos a aplicar segun el convenio del puesto.
    
    Puesto.findById(idPuesto).populate('convenio_subcat')
    .then(data=>{
        const sueldo_basico = data.convenio_subcat.basico;
        const idConvenio = data.convenio._id;
        liquidacion.puesto = data;
        liquidacion.detalle.sueldo_basico = sueldo_basico;
        //console.log(sueldo_basico, "- - - > ", sumas_remunerativas);
        return Promise.all([sueldo_basico, idConvenio]);
        
    })
    .then(([sueldo_basico, idConvenio]) =>{
        //Se toma las sumas y descuentos del convenio y se le aplica la formula correspondiente a cada caso.
        console.log(sueldo_basico, idConvenio);
        //modificamos la consulta segun las opciones basicas recibidas
        var condicion_sumas_rem = {
            $and:
                [
                    {$eq:["$$item.tipo", 'Suma Remunerativa']}
                ]
            };
        //Si no hay presentismo, ignoramos esa suma remun.
        if (!presentismo)
            condicion_sumas_rem.$and.push({$ne: ["$$item.orden", "001"]});
        
        console.log(condicion_sumas_rem);

        return  Promise.all([Convenio.aggregate([
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
        var total_sumas_no_rem = 0;
        var total_descuentos_no_rem = 0;

        //Sumas remunerativas
        detalle_liquidacion.sumas_rem.forEach((item)=>{
            console.log("--");

            //console.log(item);
            //ajustes previo al calculo
            //Si el codigo es 002 - Antiguedad, se le agrega la cantidad de años recibida por parametro
            if (item.orden === '002') {
                if(antiguedad === 0 || !antiguedad)
                    antiguedad = 1;  
                item.cantidad = antiguedad;
            }
            
            console.log(item.unidad * item.cantidad * sueldo_basico);
            item.subtotal = item.unidad * item.cantidad * sueldo_basico;
            total_sumas_rem += item.subtotal;
            
        });
        
        liquidacion.detalle.sumas_rem = detalle_liquidacion.sumas_rem;
        liquidacion.detalle.total_sumas_rem = total_sumas_rem;
        
        
        //Descuentos Remunerativos
        detalle_liquidacion.descuentos_rem.forEach((item)=>{
            console.log(item.unidad * item.cantidad * total_sumas_rem);
            item.subtotal = item.unidad * item.cantidad * total_sumas_rem;
            total_descuentos_rem += item.subtotal;
        });
        
        liquidacion.detalle.descuentos_rem = detalle_liquidacion.descuentos_rem;
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

        
        return Empleado.findById(idEmpleado);

    })
    .then(data => {
        liquidacion.empleado = data;
        return Empresa.findById(idEmpresa).select("-areas");
        
    })
    .then(data =>{
        liquidacion.empresa = data;
        console.log(liquidacion);
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


exports.findAll = (req, res) => {
    Empresa.find().populate({
            path: 'areas',
            populate: {
                path: 'departamentos',
                populate: {
                    path: 'puestos'
                }
            }
        })
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