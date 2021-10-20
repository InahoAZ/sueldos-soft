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

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Empresa = mongoose.model("empresa", schema);

  return Empresa;
};
