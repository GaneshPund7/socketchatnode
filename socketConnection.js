const socketIO = require('socket.io');
const { insertMessage } = require('./src/services/message');

function socketConnection(server) {
  const io = socketIO(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    // Join conversation room
    socket.on('join', ({ userName, conversationId }, callback) => {
      const roomName = `Conversation Room ${conversationId}`;
      socket.join(roomName);
      console.log(`👥 ${userName} joined ${roomName}`);

      // ✅ No message broadcast on join

      if (callback) callback(); // optionally acknowledge join success
    });

    // Handle sending a message
    socket.on('sendMessage', async ({ conversationId, message, userName, userId }) => {
      const roomName = `Conversation Room ${conversationId}`;
      console.log(`📨 Message from ${userName} in ${roomName}`);

      try {
        // Save message to DB
        const result = await insertMessage({
          conversationId,
          createdBy: userId,
          content: message,
          type: 'text'
        });

        if (result.error) {
          console.error(`❌ Error inserting message for ${userName}`);
          return;
        }

        // Broadcast new message to room (including sender)
        io.to(roomName).emit('receiveMessage', {
          userName,
          message,
          conversationId,
          createdAt: new Date()  // or result.data.createdAt if returned
        });

      } catch (err) {
        console.error('❌ Error in sendMessage:', err.message);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`❎ User disconnected: ${socket.id}`);
    });
  });
}

module.exports = { socketConnection };
