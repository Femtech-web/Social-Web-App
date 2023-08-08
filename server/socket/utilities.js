
module.exports = {
    getChatRoom(userId, recipentId){
        const idArray = [userId, recipentId].sort();
        const chatRoomId = `chatId_${idArray[0]}_${idArray[1]}`;

        return chatRoomId;
    },
}