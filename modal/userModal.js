const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true, unique:true },
  email: { type: String, required: true,unique:true },
  password: { type: String, required: true, },
  gender: { type: String, required: false },
});

module.exports = mongoose.model("user", userSchema);
