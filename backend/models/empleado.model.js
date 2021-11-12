const { Schema } = require("mongoose");

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            cuil: {type: String, unique: true, dropDups: true},
            //legajo
            apellido: String,
            nombre: String,
            telefono: String,
            correo: String,
            direccion: String,
            estadoCivil: String,
            nacionalidad: String,
            fechaNacimiento: Date,
            activo: Boolean,
            //fecha ingreso
            puestos: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "puesto"
                }
            ]

            
        },
        { timestamps: true}
    );
    
    
    
    
    const Empleado = mongoose.model("empleado", schema);

    return Empleado;
}