module.exports = app => {
    const empresas = require('../controllers/empresa.controller.js');

    var router = require("express").Router();

    //endpoint para crear una nueva empresa
    router.post("/", empresas.create);

    //devuelve todas las empresas
    router.get("/", empresas.findAll);
    
    //devuelve una empresa por id
    router.get("/:id", empresas.findOne);

    //modifica empresa por id
    router.put("/:id", empresas.update);

    //elimina empresa por id
    router.delete("/:id", empresas.delete);


    app.use('/api/empresas', router)
}