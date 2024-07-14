const socketSingleton = require('./socketSingleton.config');

module.exports = (server) => {
  const io = socketSingleton.init(server);

  io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('joinShop', (shopId) => {
      socket.join(shopId);
      console.log(`User joined room: ${shopId}`);
    });

    socket.on('notify', ({ shopId, notification }) => {
      io.to(shopId).emit('notification', notification);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
