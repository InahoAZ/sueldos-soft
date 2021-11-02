module.exports = app => {
    const liquidacion = require('../controllers/liquidacion.controller.js');

    var router = require("express").Router();

    //endpoint para generar una nueva liquidación
    router.post("/", liquidacion.create);

    //devuelve todas las liquidacion
    router.get("/", liquidacion.findAll);

    //devuelve una empresa por id
    router.get("/:id", liquidacion.findOne);

    //modifica empresa por id
    router.put("/:id", liquidacion.update);

    //elimina empresa por id
    router.delete("/:id", liquidacion.delete);


    app.use('/api/liquidacion', router)
}