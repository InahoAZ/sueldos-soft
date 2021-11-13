const { Schema } = require("mongoose");

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            fecha_ingreso: Date,
            fecha_egreso: Date,
            activo: Boolean,
            empleado: 
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "empleado"
                }
            ,
            puesto: 
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "puesto"
                }
            
            
        },
        { timestamps: true}
    );
    
    
    
    
    const EmpleadosPuestos = mongoose.model("empleados_puestos", schema);

    return EmpleadosPuestos;
}