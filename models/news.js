const mongoose = require('mongoose');
const { Schema } = mongoose;

const newsSchema = new Schema({
  title:  {type: String, required: [true, 'Pole tytuł jest wymagane']},
  description:   {type: String, required: [true, 'Pole treść jest wymagane']},
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', newsSchema);