const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        name: String,
        convenio: {
            type: Schema.Types.ObjectId,
            ref: 'convenio',

        }

    }, { timestamps: true });



    const Liquidacion = mongoose.model("liquidacion", schema);

    return Liquidacion;
};