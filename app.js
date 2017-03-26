/**
 * Created by Lin on 2017/3/26.
 */
var http = require('http');

http.createServer(function(req, res) {
    res.end('HelloWorld');
}).listen(8888);

console.log('server is listening 8888');