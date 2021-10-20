const { Schema } = require("mongoose");

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            name: String,
            puestos: [{
                type: Schema.Types.ObjectId,
                ref: 'puesto'

            }]
        },
        { timestamps: true}
    );
    
    
    
    
    const Departamento = mongoose.model("departamento", schema);

    return Departamento;
}