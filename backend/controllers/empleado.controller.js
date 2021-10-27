const db = require("../models");
const Puesto = db.puestos;
const Empleado = db.empleados;


exports.create = (req, res) => {
  //Se valida la request
  if(!req.body){
      res.status(400).send({ message: 'El contenido no puede estar vacio'});
      return;
  }
  
  //Se crea el empleado con lo recibido
  const empleado = new Empleado({
      cuil: req.body.cuil,
      apellido: req.body.apellido,
      nombre: req.body.nombre,
      telefono: req.body.telefono,
      correo: req.body.correo,
      direccion: req.body.direccion,
      estadoCivil: req.body.estadoCivil,
      nacionalidad: req.body.nacionalidad,
      fechaNacimiento: req.body.fechaNacimiento,
      puestos: []
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
    Empleado.find({}).populate('puestos', '-empleados')
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    Empleado.findById(id).populate('puestos', '-empleados')
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
  Empleado.findByIdAndRemove(id)
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
    Empleado.findByIdAndUpdate(id,{
        $push: {
            puestos: idPuesto,
        }
    },
    {new: true, useFindAndModify: false})
    .then(data => {
        if (!data)
            res.status(404).send({ message: "No se encontro un Empleado con ese Id."});
        else {
            return Puesto.findByIdAndUpdate(idPuesto, {
                $push: {
                    empleados: id,
                }
            }, 
            {new: true, useFindAndModify: false})            
        }
    })
    .then( data => {
        if(!data)
            res.status(404).send({ message: "No se encontro un Puesto con ese Id."});
        else
            res.send({ message: "Empleado y Puesto asociado."});
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
    Empleado.findByIdAndUpdate(id,{
        $pull: {
            puestos: idPuesto,
        }
    })
    .then(data => {
        if (!data)
            res.status(404).send({ message: "No se encontro un Empleado con ese Id."});
        else {
            return Puesto.findByIdAndUpdate(idPuesto, {
                $pull: {
                    empleados: id,
                }
            })            
        }
    })
    .then( data => {
        if(!data)
            res.status(404).send({ message: "No se encontro un Puesto con ese Id."});
        else
            res.send({ message: "Empleado y Puesto desasociado."});
    })
    .catch(err => {
        res
        .status(500)
        .send({ message: err.message})
    })
}

