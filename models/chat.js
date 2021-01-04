import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Chat = mongoose.model('Chat', ChatSchema);
export default Chat;