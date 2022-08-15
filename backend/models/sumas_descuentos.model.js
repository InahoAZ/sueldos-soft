const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        orden: {type : String, unique : true},
        name: String,
        unidad: Number,
        cantidad: {type: Number, required: true},        
        tipo: { 
            type: String, 
            enum: ['Suma Remunerativa', 'Suma No Remunerativa', 'Descuento Remunerativo', 'Descuento No Remunerativo'] 
        },
        sobre: {
            type: String,
            enum: ['sueldo_basico', 'monto_fijo', 'total_sumas_rem', 'sueldo_bruto_hora', 'sueldo_bruto_dia']
        }

    }, { timestamps: true });



    const SumasDescuentos = mongoose.model("sumas_descuentos", schema);

    return SumasDescuentos;
};