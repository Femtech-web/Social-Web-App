import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema({
    title: String,
    context: String,
    name: String,
    tags: [String],
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    selectedFile:  {
      type: [String],
      default: []
    },
    likes: {
      type: [String],
      default: []
    },
    comments: {
      type: [String],
      default: []
    },
    createdAt: {
      type: Date,
      default: new Date
    }
})

PostSchema.index({ userId: 1, title: 1 });
PostSchema.index({ userId: 1, creator: 1 });
PostSchema.index({ userId: 1, name: 1 });

const PostModel = mongoose.model('Post', PostSchema);

PostModel.on('index', (err) => {
  if (err) console.error(err)
});

export default PostModel;
