const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        orden: Number,
        name: String,
        unidad: Number,
        cantidad: Number,
        
        tipo: { 
            type: String, 
            enum: ['Suma Remunerativa', 'Suma No Remunerativa', 'Descuento Remunerativo', 'Descuento No Remunerativo'] 
        }

    }, { timestamps: true });



    const SumasDescuentos = mongoose.model("sumas_descuentos", schema);

    return SumasDescuentos;
};