const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        name: String,
        monto: Number,

    }, { timestamps: true });



    const SumasRemunerativas = mongoose.model("sumas_remunerativas", schema);

    return SumasRemunerativas;
};