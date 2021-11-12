const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        fecha_generacion: String,
        liquidacion: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "liquidacion"
        },
        es_jubilado: Boolean,
        calcular_sac: Boolean,
        antiguedad: Number,
        presentismo: Number,








    }, { timestamps: true });



    const OpcionesBasicas = mongoose.model("opciones_basicas", schema);

    return OpcionesBasicas;
};