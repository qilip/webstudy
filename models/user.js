const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username : { type : String, required : true, unique : true },
  password : { type : String,  required : true },
  registerDate : { type : Date, default : Date.now }
});
userSchema.index({ username : 1 })

userSchema.methods.comparePassword = (inputPassword, cb) => {
  if(inputPassword === this.password) {
    cb(null, true);
  }else{
    cb('err');
  }
};

module.exports = mongoose.model('user', userSchema);
