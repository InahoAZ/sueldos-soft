module.exports = app => {
    const puestos = require('../controllers/puestos.controller.js');

    var router = require("express").Router();

    //endpoint para crear una nueva area
    router.post("/", puestos.create);

    //devuelve todas las puestos
    router.get("/", puestos.findAll);
    
    //devuelve una area por id
    router.get("/:id", puestos.findOne);

    //modifica area por id
    router.put("/:id", puestos.update);

    //elimina area por id
    router.delete("/:id", puestos.delete);


    app.use('/api/puestos', router)
}