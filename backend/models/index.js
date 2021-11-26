const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

//Aca se linkean cada modelo que estan en archivos separados.
db.licencias = require('./licencia.model.js')(mongoose);
db.empresas = require('./empresa.model.js')(mongoose);
db.areas = require('./area.model.js')(mongoose);
db.departamentos = require('./departamento.model.js')(mongoose);
db.puestos = require('./puesto.model.js')(mongoose);
db.empleados = require('./empleado.model.js')(mongoose);
db.empleados_puestos = require('./empleados_puestos.model.js')(mongoose);
db.convenios = require('./convenio.model.js')(mongoose);
db.categorias_conv = require('./categorias_conv.model.js')(mongoose);
db.subcategorias_conv = require('./subcategorias_conv.model.js')(mongoose);
db.opciones_basicas = require('./opciones_basicas.model.js')(mongoose);
db.liquidacion = require('./liquidacion.model.js')(mongoose);
db.sumas_remunerativas = require('./sumas_remunerativas.model.js')(mongoose);


module.exports = db;