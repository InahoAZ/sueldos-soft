const { Schema } = require("mongoose");

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            name: String,
            empleados: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "empleado"
                }
            ]
            
        },
        { timestamps: true}
    );
    
    
    
    
    const Puesto = mongoose.model("puesto", schema);

    return Puesto;
}