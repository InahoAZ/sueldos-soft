const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        name: String,
        vigente_desde: Date,
        categorias: [{
            type: Schema.Types.ObjectId,
            ref: "categorias_conv",
        }],
        sumas_descuentos: [{
            type: Schema.Types.ObjectId,
            ref: "sumas_descuentos"
        }]
    }, { timestamps: true });



    const Convenio = mongoose.model("convenio", schema);

    return Convenio;
};