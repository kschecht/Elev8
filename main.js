// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end(dataInput);
// }).listen(8080);

//listen to local host
var express = require('express');
var path = require("path");
   var app = express();
   var http = require('http').Server(app);
   var server = http.listen(4000, "0.0.0.0", () => { //Start the server, listening on port 4000.
       console.log("Listening to requests on port 4000...");
   })

//    app.get('/', function(req, res, next) {
//     res.send("Hello world");
// });
   // app.use(express.static('public')); //Send index.html page on GET /

   // viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

   var io = require('socket.io')(server); //Bind socket.io to our express server.

//  var io = socket(server);


//get serial port data
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const serialPort = new SerialPort('COM4', { baudRate: 9600 });
const parser = serialPort.pipe(new Readline({ delimiter: '\n' }));
// Read the port data
serialPort.on("open", () => {
  console.log('serial port open');
});
parser.on('data', data =>{
//console.log(data);
    io.emit('emit_serial_data', data);
    console.log("post emit");
});
//
//
//
io.on('connection', function(){
  console.log('made socket connection');
});
