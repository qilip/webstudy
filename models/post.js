const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  text : { type : String }
});

module.exports = mongoose.model('post', postSchema);
