import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  fullname: String,
  password: {
    type: String
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  role: {
    type: String,
    default: 'USER'
  },
  createdAt: Date
});

UserSchema.index({ role: 1 });

const UserModel = mongoose.model('User', UserSchema);

UserModel.on('index', (err) => {
  if (err) console.error(err)
});

export default UserModel;
