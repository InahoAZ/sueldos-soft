const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        fecha_liquidacion: Date,
        empresa: {
            type: Schema.Types.ObjectId,
            ref: 'empresa',
        },
        empleado_puesto: {
            type: Schema.Types.ObjectId,
            ref: 'empleados_puestos',
        }


    }, { timestamps: true });



    const Liquidacion = mongoose.model("liquidacion", schema);

    return Liquidacion;
};