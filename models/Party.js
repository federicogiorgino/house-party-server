const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  guestLimit: { type: Number, required: true },
  guestsID: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  hostID: { type: String },
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
  date: { type: String, required: true },
  photo: [{ type: String }]
});

const Party = mongoose.model("Event", partySchema);

module.exports = Party;
