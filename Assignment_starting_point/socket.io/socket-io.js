
exports.init = function(io) {

  // the chat namespace
  const chat= io
      .of('/chat')
      .on('connection', function (socket) {
        try {
          /**
           * it creates or joins a room
           */
          socket.on('create or join', function (room, userId) {
            socket.join(room);
            chat.to(room).emit('joined', room, userId);
          });

          socket.on('chat', function (room, userId, chatText) {
            chat.to(room).emit('chat', room, userId, chatText);
          });

          socket.on('disconnect', function(){
            console.log('someone disconnected');
          });
        } catch (e) {
        }
      });

    // The canvas namespace
    const canvas= io
        .of('/canvas')
        .on('connection', function (socket) {
            try {
                /**
                 * it creates or joins a room
                 */
                socket.on('finish', function (room, imageUrl, userId, width, height, prevX, prevY, currX, currY, color, thickness) {
                    socket.join(room);
                    console.log(room);
                    canvas.to(room).emit('draw',room, imageUrl, userId, width, height, prevX, prevY, currX, currY, color, thickness);
                });

                socket.on('clear', function (room, c_width, c_height) {
                    socket.join(room);
                    canvas.to(room).emit('cleanup', c_width, c_height);
                });

                socket.on('disconnect', function(){
                    console.log('someone disconnected');
                });
            } catch (e) {
            }
        });
}
