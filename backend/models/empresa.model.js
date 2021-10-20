const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
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
