const express = require('express');
const app = express();

app.get('/', (req, res)=>{
  res.send('Hello World!');
  console.log('GET: /');
});

const PORT = 3000;

app.listen(PORT, ()=>{
  console.log('Express is running on port ' + PORT);
});
