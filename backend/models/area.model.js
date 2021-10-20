const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      departamentos: [{
        type: Schema.Types.ObjectId,
        ref: "departamento",
      }],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Area = mongoose.model("area", schema);

  return Area;
};
