var express = require('express');
 
var server = express();
server.use(express.static(__dirname + '/public'));
 
var port = process.env.PORT || 10001;
server.listen(port, function() {
    console.log('server listening on port ' + port);
});