const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    versionKey: false,
    timestampKey: true,
  }
);

module.exports = mongoose.model("user", userSchema);
