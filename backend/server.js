const express = require('express');
const cors = require('cors')


const app = express();

var corsOptions = {
    origin: 'http://localhost:8081'
};

//Con app use vamos haciendo como "capas" de middleware
//cada cosa que hacemos pasa por estos middlewares primero donde estos
//pueden hacer cosas como formatear, analizar, etc cosas.
//ref. https://expressjs.com/es/guide/using-middleware.html


//cors hace de middleware para poder hacer peticiones http 
//entre dominios distintos, ver cors xd
app.use(cors(corsOptions));


//para analizar y procesar json
app.use(express.json());

//para analizar y procesar x-www-form-urlencoded
app.use(express.urlencoded({extended : true}));


//definimos un endpoint

app.get("/", (req, res) => {
    res.json({
        message: 'Endpoint raiz'
    });
});

//Conexion db
const db = require("./models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


require("./routes/licencia.routes")(app);
require("./routes/empresa.routes")(app);
require("./routes/area.routes")(app);
require("./routes/departamento.routes")(app);
require("./routes/puesto.routes")(app);
require("./routes/empleado.routes")(app);
require("./routes/convenio.routes")(app);
require("./routes/liquidacion.routes")(app);


//bucle donde queda escuchando el server
const PORT = process.env.PORT || '8080'
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})
