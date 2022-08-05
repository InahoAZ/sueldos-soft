const db = require("../models");
const Area = db.areas;
const Empresa = db.empresas;

exports.create = (req, res) => {
  //Se valida la request
  if (!req.body.idEmpresa || !req.body.name) {
    res.status(400).send({ message: "Falta algun campo xd" });
    return;
  }
  console.log("ID EMPRESA: ", req.body.idEmpresa);
  //Se crea el area con lo recibido
  const area = new Area({
    name: req.body.name,
    departamentos: [],
  });

  //Obtenemos la empresa del area a crear

  //Se guarda el Area en la db
  area
    .save(area)
    .then((data) => {
      console.log("data: ", data.id);

      //Asociamos el area a la empresa
      return Empresa.findByIdAndUpdate(
        req.body.idEmpresa,
        {
          $push: {
            areas: data.id,
          },
        },
        { new: true, useFindAndModify: false }
      );
    })
    .then((data) => {
      res.send({ message: "Se creo el area correctamente" });
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findAll = (req, res) => {
  Area.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Area.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "No se encontro una Area con ese Id." });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Los campos para actualizar no pueden estar vacios",
    });
  }

  const id = req.params.id;

  Area.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "No se encontro una Area con ese Id." });
      else res.send({ message: "Area Actualizada", id: data.id });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Area.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "No se encontro la Area con ese id.",
        });
      } else {
        res.send({
          message: "La Area se borró correctamente.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "No se pudo eliminar la Area " + err.message,
      });
    });
};
