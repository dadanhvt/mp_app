exports = module.exports = function (io) {

  io.on('connection', (socket) => {

    socket.on('disconnect', () => {
      
    });
  });
};
