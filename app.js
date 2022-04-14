var http = require('http');
var fs = require('fs');
var index = fs.readFileSync( 'index.html');

var SerialPort = require('serialport');
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
  delimiter: '\r\n'
});

var port = new SerialPort('\Device\Serial4',{ 
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

port.pipe(parser);

var app = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index);
});

// const Server = require('socket.io');
// const io = new Server(app);

var io = require('socket.io').listen(app);

io.on('connection', function(socket) {
    
  console.log('Node is listening to port');
    
});

parser.on('data', function(data) {
    
  console.log('Received data from port: ' + data);
  io.emit('data', data);
    
});

app.listen(3000);