module.exports = app => {
    const licencias = require('../controllers/licencia.controller.js');

    var router = require("express").Router();

    //endpoint para crear una nueva licencia
    router.post("/", licencias.create);



    app.use('/api/licencias', router)
}