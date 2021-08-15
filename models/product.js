const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
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
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  description: {
    type: String,
  },
  avaliable: {
    type: Boolean,
    default: true,
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("product", ProductSchema);
