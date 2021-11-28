const db = require("../models");
const Puesto = db.puestos;
const Empleado = db.empleados;
const EmpleadosPuestos = db.empleados_puestos;


exports.create = (req, res) => {
  //Se valida la request
  if(!req.body){
      res.status(400).send({ message: 'El contenido no puede estar vacio'});
      return;
  }
  
  //Se crea el empleado con lo recibido
  const empleado = new Empleado({
      cuil: req.body.cuil,
      legajo: req.body.legajo,
      apellido: req.body.apellido,
      nombre: req.body.nombre,
      telefono: req.body.telefono,
      correo: req.body.correo,
      direccion: req.body.direccion,
      estadoCivil: req.body.estadoCivil,
      nacionalidad: req.body.nacionalidad,
      fechaNacimiento: req.body.fechaNacimiento,
      puestos: [],
      activo: true,
  });

  

  //Se guarda el empleado en la db
  empleado
  .save(empleado)
  .then(data => {
        console.log('data: ', data.id);
        res.send({message: 'Se creo el empleado correctamente', body: data});
  })
  .catch(err => {
      res.status(500).send({
          message: err.message
      });
  });

};

//devuelve todos los empleados
exports.findAll = (req, res) => {
    Empleado.find({activo: true})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// devuelve un empleado por su CUIL
exports.findOnebyCuil = (req, res) => {
    const cuil = req.params.cuil;

    Empleado.findOne({cuil: cuil})
    .then(data => {
        if (!data)
            res.status(404).send({ message: "No se encontro un empleado con ese Cuil."});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({ message: err.message})
    })
};

// devuelve un empleado por su Id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Empleado.findById(id)
    .then(data => {
        if (!data)
            res.status(404).send({ message: "No se encontro un empleado con ese Id."});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({ message: err.message})
    })
};


exports.update = (req, res) => {
    if (!req.body){
        return res.status(400).send({
            message: "Los campos para actualizar no pueden estar vacios"
        });
    }

    const id = req.params.id;

    Empleado.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data)
            res.status(404).send({ message: "No se encontro un Empleado con ese Id."});
        else res.send({ message: "Empleado Actualizado", body: data});
    })
    .catch(err => {
        res
        .status(500)
        .send({ message: err.message})
    })
};


exports.delete = (req, res) => {
  const id = req.params.id;
  Empleado.findByIdAndUpdate(id, {activo: false}, { useFindAndModify: false })
  .then(data => {
    if (!data) {
        res.status(404).send({
            message: "No se encontro el Empleado con ese id."
        });
    } else {
        res.send({
            message: "el Empleado se borró correctamente."
        });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "No se pudo eliminar el Empleado " + err.message
    });
  });
};


//asocia un empleado con un puesto, y a ese puesto con ese empleado ("many-to-many")
exports.linkPuesto = (req, res) => {

    if(!req.body){
        res.status(400).send({ message: 'El contenido no puede estar vacio'});
        return;
    }

    const id = req.params.id;
    const idPuesto = req.body.idPuesto;


    Empleado.findById(id)
    .then(data => {
        if (!data) 
            throw Error("No se encontro un empleado con ese Id.");        
        else
            return Puesto.findById(idPuesto);
    })
    .then(data => {
        if (!data)
            throw Error("No se encontro un puesto con ese Id.");
        else
            return EmpleadosPuestos.find({empleado: id, puesto: idPuesto, activo:true});

    },)
    .then(data => {
        if(data.length)
            throw Error("Ya existe la asociacion entre el empleado y el puesto y esta activo.");        
        else {
            //asocio el empleado con su puesto registrando su fecha de ingreso.
        
            const empleado_puesto = new EmpleadosPuestos({
                fecha_ingreso: req.body.fecha_ingreso,
                fecha_egreso: null,
                activo: true,
                empleado: id,
                puesto: idPuesto,
            })
            return empleado_puesto.save(empleado_puesto)
        }
        
    })
    .then(data => {
        res.send({ message: "Empleado asociado a puesto correctamente", body: data,});
    })
    .catch(err => {
        res
        .status(500)
        .send({ message: err.message})
    })
}

exports.unlinkPuesto = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: 'El contenido no puede estar vacio'});
        return;
    }

    const id = req.params.id;
    const idPuesto = req.body.idPuesto;

    Empleado.findById(id)
    .then(data => {
        if (!data) 
            throw Error("No se encontro un empleado con ese Id.");        
        else
            return Puesto.findById(idPuesto);
    })
    .then(data => {
        if (!data)
            throw Error("No se encontro un puesto con ese Id.");
        else
            return EmpleadosPuestos.findOneAndUpdate({empleado: id, puesto: idPuesto, activo:true},{
                fecha_egreso: req.body.fecha_egreso,
                activo: false
            });

    },)    
    .then( data => {
        if(!data)
            res.status(404).send({ message: "No se encontro un Empleado con ese Puesto activo"});
        else
            res.send({ message: "Empleado y Puesto desasociado."});
    })
    .catch(err => {
        res
        .status(500)
        .send({ message: err.message})
    })
}

