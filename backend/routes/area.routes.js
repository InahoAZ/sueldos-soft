module.exports = app => {
    const areas = require('../controllers/area.controller.js');

    var router = require("express").Router();

    //endpoint para crear una nueva area
    router.post("/", areas.create);

    //devuelve todas las areas
    router.get("/", areas.findAll);
    
    //devuelve una area por id
    router.get("/:id", areas.findOne);

    //modifica area por id
    router.put("/:id", areas.update);

    //elimina area por id
    router.delete("/:id", areas.delete);


    app.use('/api/areas', router)
}