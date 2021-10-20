const db = require("../models");
const Area = db.areas;
const Departamento = db.departamentos;


exports.create = (req, res) => {
  //Se valida la request
  if(!req.body.idArea || !req.body.name){
      res.status(400).send({ message: 'Falta algun campo xd'});
      return;
  }
  console.log("ID Area: ", req.body.idArea)
  //Se crea el depto con lo recibido
  const departamento = new Departamento({
      name: req.body.name,
      puestos: [],
  });

  //Obtenemos el area del departamento a crear
  

  //Se guarda el departamento en la db
  departamento
  .save(departamento)
  .then(data => {
        console.log('data: ', data.id);
      
        //Asociamos el departamento al area
        return Area.findByIdAndUpdate(req.body.idArea, {
            $push: {
                departamentos: data.id
            }            
        }, {new: true, useFindAndModify: false})
        
      
  })
    .then(data => {
        res.send({message: 'Se creo el departamento correctamente'});
    })
    
  .catch(err => {
      res.status(500).send({
          message: err.message
      });
  });

};


exports.findAll = (req, res) => {
    Departamento.find({})
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

    Departamento.findById(id)
    .then(data => {
        if (!data)
            res.status(404).send({ message: "No se encontro una Departamento con ese Id."});
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

    Departamento.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data)
            res.status(404).send({ message: "No se encontro una Departamento con ese Id."});
        else res.send({ message: "Departamento Actualizada", id: data.id});
    })
    .catch(err => {
        res
        .status(500)
        .send({ message: err.message})
    })
};


exports.delete = (req, res) => {
  const id = req.params.id;
  Departamento.findByIdAndRemove(id)
  .then(data => {
    if (!data) {
        res.status(404).send({
            message: "No se encontro el Departamento con ese id."
        });
    } else {
        res.send({
            message: "el Departamento se borró correctamente."
        });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "No se pudo eliminar el Departamento " + err.message
    });
  });
};

