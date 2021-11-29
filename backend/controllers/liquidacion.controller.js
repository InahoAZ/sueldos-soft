const { categorias_conv, sumas_remunerativas } = require("../models");
const db = require("../models");
const Liquidacion = db.liquidacion;
const SubCategoriaConv = db.subcategorias_conv;
const Puesto = db.puestos;
const Convenio = db.convenios;


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
        "sumas_descuentos": []
    };
    //recibe JSON con
    const idEmpleado = req.body.idEmpleado;
    const idPuesto = req.body.idPuesto;
    

    //Antiguedad: Se recibe por parametro. Para versiones futuras se puede calcular a partir 
    //del tiempo del empleado en el puesto. (numero)
    const antiguedad = req.body.antiguedad;

    //Para saber si se contempla presentismo o no. (Si falto ese mes, no iria, 
    //o si la empresa no usa ese concepto) (boolean)
    const presentismo = req.body.presentismo;

    //Obtenemos el sueldo basico del empleado segun el puesto que ocupa.
    //Como tambien las sumas y descuentos a aplicar segun el convenio del puesto.
    Puesto.findById(idPuesto).populate('convenio').populate('convenio_subcat')
    .then(data=>{
        const sueldo_basico = data.convenio_subcat.basico;
        const sumas_descuentos = data.convenio.sumas_descuentos;
        //console.log(sueldo_basico, "- - - > ", sumas_remunerativas);
        return Promise.all([sueldo_basico, sumas_descuentos]);
        
    })
    .then(([sueldo_basico, sumas_descuentos]) =>{
        //Se toma las sumas y descuentos del convenio y se le aplica la formula correspondiente a cada caso.
        console.log(sueldo_basico, sumas_descuentos);
        sumas_descuentos.forEach( (valor, indice, array)=>{
            
        })
    })
    .catch(err => {
        console.log("err: ", err);
    })

    return;
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