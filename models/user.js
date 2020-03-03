const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  attending: [{ type: mongoose.Schema.Types.ObjectId, ref: "Party" }],
  organizing: [{ type: mongoose.Schema.Types.ObjectId, ref: "Party" }],
  profilePicture: { type: String, required: true },
  bio: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;




