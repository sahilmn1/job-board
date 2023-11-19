const mongoose = require("mongoose");
const bcryptjs = require("bycryptjs");

// Define User schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(user.password, salt);
  user.password = hash;
  next();
});

// Create User model
const User = mongoose.model("User", userSchema, "signup");

module.exports = User;
