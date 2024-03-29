const db = require("../models");
const Empresa = db.empresas;


exports.create = (req, res) => {
  //Se valida la request
  if(!req.body.name){
      res.status(400).send({ message: 'El contenido no puede estar vacio.'});
      return;
  }

  //Se crea la empresa con lo recibido
  const empresa = new Empresa({
      name: req.body.name,
      tipo: req.body.tipo,
      cuit: req.body.cuit,
      web: req.body.web,
      telefono: req.body.telefono,
      pais: req.body.pais,
      localidad: req.body.localidad,
      codigoPostal: req.body.codigoPostal,
      provincia: req.body.provincia,
      calleNumero: req.body.calleNumero,
      areas: [],
  });

  //Se guarda la Empresa en la db
  empresa
  .save(empresa)
  .then(data => {
      console.log('data: ', data);
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message: err.message
      });
  });

};


exports.findAll = (req, res) => {
    Empresa.find().populate({
        path: 'areas',
        populate: {
            path: 'departamentos',
            populate: {
                path: 'puestos'
            }
        }
    })
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

    Empresa.findById(id).populate('areas')
    .then(data => {
        if (!data)
            res.status(404).send({ message: "No se encontro una Empresa con ese Id."});
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

    Empresa.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data)
            res.status(404).send({ message: "No se encontro una Empresa con ese Id."});
        else res.send({ message: "Empresa Actualizada", id: data.id});
    })
    .catch(err => {
        res
        .status(500)
        .send({ message: err.message})
    })
};


exports.delete = (req, res) => {
  const id = req.params.id;
  Empresa.findByIdAndRemove(id)
  .then(data => {
    if (!data) {
        res.status(404).send({
            message: "No se encontro la empresa con ese id."
        });
    } else {
        res.send({
            message: "La empresa se borró correctamente."
        });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "No se pudo eliminar la empresa " + err.message
    });
  });
};


exports.deleteAll = (req, res) => {
  
};


exports.findAllPublished = (req, res) => {
  
};