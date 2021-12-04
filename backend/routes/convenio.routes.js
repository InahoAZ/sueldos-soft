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

    //endpoint para actualizar los valores de una sub-categoria
    router.put("/:id/updateSubCategoria", convenios.updateSubCategoria);
    
    //endpoint para eliminar y quitar una nueva categoria a un convenio
    router.put("/:id/quitarSubCategoria", convenios.quitarSubCategoria);

    //endpoint para agregar y asociar una suma o descuento a un convenio
    router.put("/:id/agregarSumaDescuento", convenios.agregarSumaDescuento);

    //endpoint para quitar y desasociar una suma o descuento a un convenio
    router.put("/:id/quitarSumaDescuento", convenios.quitarSumaDescuento);

    app.use('/api/convenios', router)
}