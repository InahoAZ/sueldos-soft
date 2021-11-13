const db = require("../models");
const Convenio = db.convenios;
const SubCategoriaConv = db.subcategorias_conv;
const CategoriaConv = db.categorias_conv;
const OpcionesBasicas = db.convenios;
const SumasRemunerativas = db.sumas_remunerativas;


exports.create = (req, res) => {
    //Se valida la request
    if (!req.body) {
        res.status(400).send({ message: 'Falta algun campo xd' });
        return;
    }

    //Se crea el convenio con lo recibido
    const convenio = new Convenio({
        name: req.body.name,
        vigente_desde: req.body.vigente_desde,
        categorias: [],
        sumas_remunerativas: [],

    });



    //Se guarda el convenio en la db
    convenio
        .save(convenio)
        .then(data => {
            res.send({ message: 'Se creo el convenio correctamente', data: data });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });

};


exports.findAll = (req, res) => {
    Convenio.find().populate({
        path: 'categorias',
        populate: {
            path: 'subcategorias'
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

    Convenio.findById(id).populate('categorias_conv')
        .then(data => {
            if (!data)
                res.status(404).send({ message: "No se encontro una convenio con ese Id." });
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

    Convenio.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data)
                res.status(404).send({ message: "No se encontro un Convenio con ese Id." });
            else res.send({ message: "Convenio Actualizado", id: data.id });
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message })
        })
};


exports.delete = (req, res) => {
    const id = req.params.id;
    Convenio.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "No se encontro El Convenio con ese id."
                });
            } else {
                res.send({
                    message: "El Convenio se borró correctamente."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar El Convenio " + err.message
            });
        });
};

exports.agregarCategoria = (req, res) => {
    const id = req.params.id;

    Convenio.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "No se encontro una convenio con ese Id." });
            else {
                //Se valida la request
                if (!req.body) {
                    res.status(400).send({ message: 'Falta algun campo xd' });
                    return;
                }

                //Se crea la categoria del convenio con lo recibido
                const categoria_conv = new CategoriaConv({
                    name: req.body.name,
                    subcategorias: [],
                });

                return categoria_conv.save(categoria_conv);
            }
        })
        .then(data => {
            return Convenio.findByIdAndUpdate(id, {
                $push: {
                    categorias: data.id
                }
            }, { new: true, useFindAndModify: false })
        })
        .then(data => {
            res.send({ message: "Se agrego la categoria al convenio correctamente", data: data });
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message })
        })
};

exports.quitarCategoria = (req, res) => {
    const idConv = req.params.id;
    const idCat = req.body.idCat;
    Convenio.findByIdAndUpdate(idConv, {
            $pull: {
                categorias: idCat
            }
        }, { new: true, useFindAndModify: false })
        .then(data => {
            CategoriaConv.findByIdAndRemove(idCat)
                .then(data => {
                    if (!data) {
                        res.status(404).send({
                            message: "No se encontro La Categoria con ese id."
                        });
                    } else {
                        res.send({
                            message: "La Categoria se borró correctamente."
                        });
                    }
                })
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message })
        })
};

exports.agregarSubCategoria = (req, res) => {
    const id = req.params.id;
    const idCat = req.body.idCat;
    if (!idCat)
        res.status(400).send({ message: "Falta el campo idCat" })

    Convenio.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "No se encontro una convenio con ese Id." });
            else {
                //Se valida la request
                if (!req.body) {
                    res.status(400).send({ message: 'Falta algun campo xd' });
                    return;
                }

                //Se crea la categoria del convenio con lo recibido
                const subcategoria_conv = new SubCategoriaConv({
                    name: req.body.name,
                    basico: req.body.basico
                });

                return subcategoria_conv.save(subcategoria_conv);
            }
        })
        .then(data => {
            return CategoriaConv.findByIdAndUpdate(idCat, {
                $push: {
                    subcategorias: data.id
                }
            }, { new: true, useFindAndModify: false })
        })
        .then(data => {
            res.send({ message: "Se agrego la subcategoria al convenio correctamente", data: data });
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message })
        })
};

exports.quitarSubCategoria = (req, res) => {
    const idCat = req.body.idCat;
    const idSubCat = req.body.idSubCat;
    CategoriaConv.findByIdAndUpdate(idCat, {
            $pull: {
                subcategorias: idSubCat
            }
        }, { new: true, useFindAndModify: false })
        .then(data => {
            SubCategoriaConv.findByIdAndRemove(idSubCat)
                .then(data => {
                    if (!data) {
                        res.status(404).send({
                            message: "No se encontro La SubCategoria con ese id."
                        });
                    } else {
                        res.send({
                            message: "La SubCategoria se borró correctamente."
                        });
                    }
                })
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message })
        })
};