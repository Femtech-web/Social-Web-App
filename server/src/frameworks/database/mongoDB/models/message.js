const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  chatroom: String,
  message: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const MessageModel = mongoose.model("Message", messageSchema);
export default MessageModel;
