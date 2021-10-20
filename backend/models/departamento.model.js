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
    
    
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    
    const Departamento = mongoose.model("departamento", schema);

    return Departamento;
}