const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

CategorySchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("category", CategorySchema);
