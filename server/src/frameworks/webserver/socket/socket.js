import Message from '../../database/mongoDB/models/message';
import { getChatRoom } from './utilities';

export default (io) => {
  io.on('connection', (socket) => {
    const { userId } = socket.handshake.auth;

    socket.on('join room', async (recipentId) => {
      const chatroom = getChatRoom(userId, recipentId);

      socket.join(chatroom);

      io.to(chatroom).emit('roomId', chatroom);
    })

    socket.on('sendMessage', async ({recipentId, message, chatroom}) => {
      if(!chatroom){
          return;
      }

      io.to(chatroom).emit('message', {sender: userId, receiver: recipentId,  message, createdAt: new Date().toISOString()})

      const newMessage = new Message({ sender: userId, receiver: recipentId, chatroom, message, createdAt: new Date().toISOString()});
      await newMessage.save();
    })

    socket.emit('started', 'Socket connection is running')
  })
}