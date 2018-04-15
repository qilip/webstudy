const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const server = require('http').createServer(app);
const db = require('./dbconnect.js');
const passport = require('passport');
const passportConfig = require('./passport');
const session = require('express-session');
const flash = require('connect-flash');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'nao7vb3wtT*O#&BNq#OV*N2n',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/css', express.static(__dirname + '/static/css'));
app.use('/js', express.static(__dirname + 'static/js'));

db();
passportConfig();

//헤헤 귀차나 START

app.use('/', express.static(path.resolve(__dirname, 'public')));
app.use('/login', express.static(path.resolve(__dirname, 'public/login')));

app.post('/api/register', (req, res) => {
  const newUser = new User({
    username : req.body.username,
    password : req.body.password
  });
  newUser.save( (err) => {
    if(err){
      console.log(err);
      res.send('가입 실패');
      return;
    }
    res.send('가입 성공 : ' + req.body.username + ' 계정이 생성되었습니다.');
  });
});

app.post('/api/login', passport.authenticate('local', {
  failureRedirect: '/'
}), (req, res) => {
  res.redirect('/');
});

app.use((req, res, next) => {
  res.status(404).send('페이지를 찾을 수 없습니다.');
});
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('500 서버 에러');
});

// 헤헤 귀차나 END

const PORT = 3000;

server.listen(PORT, () => {
  console.log('Express is running on port ' + PORT);
});
