const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      tipo: String,
      cuit: String,
      pais: String,
      provincia: String,
      localidad: String,
      codigoPostal: String,
      calleNumero: String,
      telefono: String,
      web: String,
      areas: [{
        type: Schema.Types.ObjectId,
        ref: "area",
      }],
    },
    { timestamps: true }
  );

  

  const Empresa = mongoose.model("empresa", schema);

  return Empresa;
};
