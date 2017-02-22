var express = require('express'),
	app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index');
})

app.get('/task', function (req, res) {
  res.render('task');
})

app.get('/signin', function (req, res) {
  res.render('signin');
})

app.get('/signup', function (req, res) {
  res.render('signup');
})

app.get('/leader', function (req, res) {
  res.render('leader');
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})