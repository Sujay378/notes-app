const Mongoose = require('mongoose');

const connectDB = (cb) => {
  Mongoose.connect(process.env.MONGO_URI)
    .then(client => {
      console.log('DB connected');
      cb(client);
    })
    .catch(err => {
      console.log(err);
    })
}

module.exports = { connectDB };
