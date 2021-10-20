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

  

  const Area = mongoose.model("area", schema);

  return Area;
};
