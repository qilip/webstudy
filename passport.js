const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((user, done) => {
    User.findById(id, (err, user) => {
      done(null, user);
    });
  });

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: true,
    passReqToCallback: false,
  }, (username, password, done) => {
    Users.findOne({ password: password }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, {
        message: '아이디 또는 비밀번호가 잘못되었습니다.'
      });
      return user.comparePassword(password, (paseError, isMatch) => {
        if (isMatch){
          return done(null, user);
        }
        return done(null, false, {
          message: '아이디 또는 비밀번호가 잘못되었습니다.'
        });
      });
    });
  }));
};
