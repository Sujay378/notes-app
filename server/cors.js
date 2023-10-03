const cors = require('cors');

const corsClient = cors({
  origin: ['http://localhost:4200'],
  allowedHeaders: ['Authorize', 'Content-Type'],
  exposedHeaders: ['Authorize', 'Content-Type']
})

module.exports = corsClient;
