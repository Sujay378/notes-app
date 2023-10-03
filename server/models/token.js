const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const schemaOption = {
  token: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
};

const authTokenSchema = new Schema(schemaOption, {
  expireAfterSeconds: 60 * 60
});

const resetTokenSchema = new Schema(schemaOption, {
  expireAfterSeconds: 10 * 60
});

const AuthToken = Mongoose.model('Auth', authTokenSchema);
const ResetToken = Mongoose.model('Reset', resetTokenSchema);

module.exports = { AuthToken, ResetToken };
