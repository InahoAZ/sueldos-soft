module.exports = app => {
    const empleados = require('../controllers/empleado.controller.js');

    var router = require("express").Router();

    //endpoint para crear una nueva empleado
    router.post("/", empleados.create);

    //devuelve todos los empleados
    router.get("/", empleados.findAll);
    
    //devuelve una empleado por id
    router.get("/:id", empleados.findOne);

    //modifica empleado por id
    router.put("/:id", empleados.update);

    //elimina empleado por id
    router.delete("/:id", empleados.delete);

    //asocia un empleado con un puesto:
    router.put("/:id/asignarPuesto", empleados.linkPuesto);

    //desasocia un empleado con un puesto:
    router.put("/:id/desasignarPuesto", empleados.linkPuesto);


    app.use('/api/empleados', router)
}