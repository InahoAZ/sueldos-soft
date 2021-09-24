const db = require('../models');
const Licencia = db.licencias;

// Create and Save a new Licencia
exports.create = (req, res) => {
    
    //Validaciones
    if (!req.body.descripcion) {
        res.status(400).send(({ message: "El contenido no puede estar vacio"}))
    }

    //Creamos el item
    const licencia = new Licencia({
        descripcion: req.body.descripcion
    });

    //Guardamos en la bd
    licencia
        .save(licencia)
        .then(data => {
            res.send(data);
        })
        .catch( err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al crear la licencia"
            })
        })
};

// Retrieve all Licencias from the database.
exports.findAll = (req, res) => {

};

// Find a single Licencia with an id
exports.findOne = (req, res) => {

};

// Update a Licencia by the id in the request
exports.update = (req, res) => {

};

// Delete a Licencia with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Licencias from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Licencias
exports.findAllPublished = (req, res) => {

};