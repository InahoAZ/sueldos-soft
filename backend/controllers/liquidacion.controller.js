const { categorias_conv } = require("../models");
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
    //recibe JSON con
    const idEmpleado = req.body.idEmpleado;
    const idSubCategoriaConv = req.body.idSubCategoriaConv;
    console.log("idSub: ", idSubCategoriaConv);

    //TODO: a partir del puesto buscar la subcategoria con el basico y el convenio asociado
    const test = Convenio.aggregate([
        {
            "$lookup": {
                "from": Convenio.collection.name,
                "localField":"categorias_conv",
                "foreignField": "_id",
                "as": "categoria_conv"
            }
        }
    ])
    console.log("askljgla----> ", test[0]);
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