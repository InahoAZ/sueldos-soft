const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        name: String,
        vigente_desde: Date,
        categorias: [{
            type: Schema.Types.ObjectId,
            ref: "categorias_conv",
        }],
        sumas_remunerativas: [{
            type: Schema.Types.ObjectId,
            ref: "sumas_remunerativas"
        }]
    }, { timestamps: true });



    const Convenio = mongoose.model("convenio", schema);

    return Convenio;
};