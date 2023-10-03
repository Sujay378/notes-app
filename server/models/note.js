const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const noteSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = Mongoose.model('Note', noteSchema);
