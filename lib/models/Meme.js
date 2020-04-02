const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  top: {
    type: String,
  },
  image: {
    type: String,
    required: true  
  },
  bottom: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Meme', schema);
