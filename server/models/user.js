const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, set: (email) => email.toLowerCase() },
  password: { type: String, required: true },
  notes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    default: [],
  },
});

module.exports = Mongoose.model("User", userSchema);
