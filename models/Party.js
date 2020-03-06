const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partySchema = new Schema({
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  guestLimit: { type: Number, required: true },
  guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  city: {
    type: String,
    enum: [
      "Rome",
      "Barcelona",
      "Zurich",
      "Amsterdam",
      "Paris",
      "Berlin",
      "New York City",
      "Moscow",
      "Miami"
    ],
    required: true
  },
  address: { type: String, required: true },
  date: { type: Date, required: true },
  photo: [{ type: String }]
});

const Party = mongoose.model("Party", partySchema);

module.exports = Party;
