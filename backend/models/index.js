const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url  = dbConfig.url;

//Aca se linkean cada modelo que estan en archivos separados.
db.licencias = require('./licencia.model.js')(mongoose);
db.empresas = require('./empresa.model.js')(mongoose);


module.exports = db;