const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        "empleado" : Object,
        "empresa": Object,
        "puesto": Object,
        "detalle": Object,
        "datos_bancarios": Object,
        "jubilacion":Object,

        
    }, { timestamps: true });



    const Liquidacion = mongoose.model("liquidacion", schema);

    return Liquidacion;
};