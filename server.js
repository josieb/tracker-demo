var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(__dirname + '/public'));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Tracker demo listening at http://%s:%s', host, port);
});