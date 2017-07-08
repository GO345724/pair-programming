var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var config = require('./webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var port = process.env.PORT || 3000;

var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));
// Routing
app.use(express.static('./client/assets'));

// Route
app.get('/', (req, res) => {
  res.sendFile(path.resolve('client/index.html'));
})

io.sockets.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('room', function(data) {
    console.log('in joining room in SERVER');
    socket.join(data.room);
    console.log(data);
    socket.broadcast.to(data.room).emit('load users and code');
    socket.broadcast.to(data.room).emit('new user join', data.user);
  });
  socket.on('leave room', function(data) {
    socket.broadcast.to(data.room).emit('user left room', {user: data.user});
    socket.leave(data.room);
  });
  socket.on('coding event', function(data) {
    console.log('in EXPRESS coding event')
    console.log(data)
    socket.broadcast.to(data.room).emit('receive code', {code: data.code, currentlyTyping: data.currentlyTyping});
  });
  socket.on('change mode', function(data) {
    socket.broadcast.to(data.room).emit('receive change mode', data.mode)
  });

  socket.on('send users and code', function(data) {
    socket.broadcast.to(data.room).emit('receive users and code', data);
  });
});

server.listen(port, function(){
  console.log('listening on *:3000');
});
