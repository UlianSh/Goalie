var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

console.log(fs.readdirSync('public/img'));

var onPort = 3000;
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
    res.send('Post: ' + new Date());
});

app.listen(onPort, function () {
    console.log('App Running on Port: ' + onPort);
});