module.exports = app => {
    const convenios = require('../controllers/convenio.controller.js');

    var router = require("express").Router();

    //endpoint para crear una nuevo convenios
    router.post("/", convenios.create);

    //devuelve todas los convenios
    router.get("/", convenios.findAll);
    
    //devuelve un convenio por id
    router.get("/:id", convenios.findOne);

    //modifica convenio por id
    router.put("/:id", convenios.update);

    //elimina convenio por id
    router.delete("/:id", convenios.delete);

    // CATEGORIAS
    //endpoint para crear y añadir una nueva categoria a un convenio
    router.put("/:id/agregarCategoria", convenios.agregarCategoria);
    
    //endpoint para eliminar y quitar una nueva categoria a un convenio
    router.put("/:id/quitarCategoria", convenios.quitarCategoria);

    // Sub CATEGORIAS
    //endpoint para crear y añadir una nueva categoria a un convenio
    router.put("/:id/agregarSubCategoria", convenios.agregarSubCategoria);
    
    //endpoint para eliminar y quitar una nueva categoria a un convenio
    router.put("/:id/quitarSubCategoria", convenios.quitarSubCategoria);

    //endpoint para agregar y asociar una suma remunerativa a un convenio
    router.put("/:id/agregarSumaRemunerativa", convenios.agregarSumaRemunerativa);

    //endpoint para quitar y desasociar una suma remunerativa a un convenio
    router.put("/:id/quitarSumaRemunerativa", convenios.quitarSumaRemunerativa);

    app.use('/api/convenios', router)
}