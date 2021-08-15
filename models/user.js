const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  firstName: {
    type: String,
    required: [true, "Name value is required"],
  },
  lastName: {
    type: String,
    required: [true, "Name value is required"],
  },
  email: {
    type: String,
    required: [true, "Email value is required"],
  },
  password: {
    type: String,
    required: [true, "Password value is required"],
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    required: [true, "Role value is required"],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
    default: "USER_ROLE",
  },
  isGoogleLogin: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("user", UserSchema);
