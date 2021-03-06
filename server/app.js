const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()

const msg = (name, text, id) => ({name, text, id});

io.on('connection', socket => {
  socket.on('userJoined', (data, cb) => {
    if(!data.name || !data.room){
      return cb("Data error")
    }

    socket.join(data.room)
    users.remove(socket.id)
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    })
    cb({userId: socket.id})
    io.to(data.room).emit('updateUsers', users.getByRoom(data.room));
    socket.emit('newMessage', msg('admin', `Welcome to the Chyat, anyone`))
    socket.broadcast.to(data.room)
      .emit('newMessage', msg('admin', `Пользователь ${data.name} зашел.`))
  })

  socket.on('createMessage', (data, cb) => {
    if(!data.text) {
      return cb("Нельзя отправить пустое сообщение")
    }

    const user = users.get(data.id);
    if (user) {
      io.to(user.room).emit('newMessage', msg(user.name, data.text, data.id))
    }
    cb();
  })

  socket.on('userLeft', (id, cb) => {
    const user = users.remove(id);
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room));
      io.to(user.room).emit('newMessage', msg('admin', `Пользователь ${user.name} вышел.`))
    }
    cb()
  })

  socket.on('disconnect', () => {
    const user = users.remove(socket.id);
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room));
      io.to(user.room).emit('newMessage', msg('admin', `Пользователь ${user.name} вышел.`))
    }
  })
})

module.exports = {
  app,
  server
}
