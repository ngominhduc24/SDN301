const socketIo = require('socket.io');

module.exports = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: "*"
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('joinShop', (shopId) => {
      socket.join(shopId);
      console.log(`User joined room: ${shopId}`);   // just for test
    });

    socket.on('notify', ({ shopId, notification }) => {
      io.to(shopId).emit('notification', notification);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
