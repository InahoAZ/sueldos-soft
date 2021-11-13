const { Schema } = require("mongoose");

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            cuil: {type: String, unique: true, dropDups: true},
            legajo: String,
            apellido: String,
            nombre: String,
            telefono: String,
            correo: String,
            direccion: String,
            estadoCivil: String,
            nacionalidad: String,
            fechaNacimiento: Date,
            activo: Boolean,           

            
        },
        { timestamps: true}
    );
    
    
    
    
    const Empleado = mongoose.model("empleado", schema);

    return Empleado;
}