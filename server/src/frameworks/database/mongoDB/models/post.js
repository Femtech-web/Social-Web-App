const mongoose = require('mongoose');

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
PostSchema.index({ userId: 1, context: 1 });
PostSchema.index({ userId: 1, createdAt: 1 });
PostSchema.index({ userId: 1, isPublished: 1 });

const PostModel = mongoose.model('Post', PostSchema);

PostModel.ensureIndexes((err) => {
  if (err) {
    return err;
  }
  return true;
});

export default PostModel;
