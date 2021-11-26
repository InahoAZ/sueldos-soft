const db = require("../models");
const Puesto = db.puestos;
const Departamento = db.departamentos;


exports.create = (req, res) => {
  //Se valida la request
  if(!req.body.name){
      res.status(400).send({ message: 'Falta algun campo xd'});
      return;
  }
  console.log("ID Departamento: ", req.body.idDepartamento)
  //Se crea el puesto con lo recibido
  const puesto = new Puesto({
      name: req.body.name,
      convenio_subcat: req.body.idSubCategoriaConv

  });

  

  //Se guarda el puesto en la db
  puesto
  .save(puesto)
  .then(data => {
        console.log('data: ', data.id);
      
        //Asociamos el puesto al area
        return Departamento.findByIdAndUpdate(req.body.idDepartamento, {
            $push: {
                puestos: data.id
            }            
        }, {new: true, useFindAndModify: false})
        
      
  })
    .then(data => {
        res.send({message: 'Se creo el puesto correctamente'});
    })
    
  .catch(err => {
      res.status(500).send({
          message: err.message
      });
  });

};


exports.findAll = (req, res) => {
    Puesto.find({})
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

    Puesto.findById(id)
    .then(data => {
        if (!data)
            res.status(404).send({ message: "No se encontro una Puesto con ese Id."});
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

    Puesto.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data)
            res.status(404).send({ message: "No se encontro una Puesto con ese Id."});
        else res.send({ message: "Puesto Actualizada", id: data.id});
    })
    .catch(err => {
        res
        .status(500)
        .send({ message: err.message})
    })
};


exports.delete = (req, res) => {
  const id = req.params.id;
  Puesto.findByIdAndRemove(id)
  .then(data => {
    if (!data) {
        res.status(404).send({
            message: "No se encontro el Puesto con ese id."
        });
    } else {
        res.send({
            message: "el Puesto se borró correctamente."
        });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "No se pudo eliminar el Puesto " + err.message
    });
  });
};

