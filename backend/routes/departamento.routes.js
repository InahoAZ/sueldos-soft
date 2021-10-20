module.exports = app => {
    const departamentos = require('../controllers/departamentos.controller.js');

    var router = require("express").Router();

    //endpoint para crear una nueva area
    router.post("/", departamentos.create);

    //devuelve todas las departamentos
    router.get("/", departamentos.findAll);
    
    //devuelve una area por id
    router.get("/:id", departamentos.findOne);

    //modifica area por id
    router.put("/:id", departamentos.update);

    //elimina area por id
    router.delete("/:id", departamentos.delete);


    app.use('/api/departamentos', router)
}