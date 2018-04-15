const mongoose = require('mongoose');

module.exports = () => {
  const db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', () => {
    console.log('mongoDB connected');
  });
  mongoose.connect('mongodb://localhost/hehe');

  const Post = require('./models/post');
  const User = require('./models/user');
}
