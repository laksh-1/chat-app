// Node server which will handle socket io
const io = require('socket.io')(8000);

const users = {};

io.on('connection', socket => {
    //listen the new user joining req
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    //listen the send req
    socket.on('send', message => {
        socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
    });

    //listen the disconnect req
    socket.on('disconnect', message =>{
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    })
})