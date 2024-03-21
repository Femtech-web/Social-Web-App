import PostModel from '../models/post';

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function postRepositoryMongoDB() {
  const findAll = (params) =>
    PostModel.find(omit(params, 'page', 'perPage'))
      .skip(params.perPage * params.page - params.perPage)
      .limit(params.perPage)
      .sort({createdAt: -1});;

  const findBySearch = (searchTerm) => 
    Post.find(
      {$or: [ {searchTerm}, {tags: {$in: [searchTerm]}} ] }
    ).sort({createdAt: -1});

  const countAll = (params) =>
    PostModel.countDocuments(omit(params, 'page', 'perPage'));

  const findById = (id) => PostModel.findById(id);

  const add = (postEntity) => {
    const newPost = new PostModel({
      title: postEntity.Title,
      context: postEntity.Description,
      name: postEntity.Name,
      selectedFile: postEntity.SelectedFile,
      creator: postEntity.Creator,
      tags: postEntity.Tags,
      createdAt: new Date(),
    });

    return newPost.save();
  };

  const updateById = (id, postEntity) => {
    const updatedPost = {
      title: postEntity.Title,
      context: postEntity.Description,
      name: postEntity.Name,
      creator: postEntity.Creator,
      createdAt: new Date(),
    };

    return PostModel.findOneAndUpdate(
      { _id: id },
      { $set: {...updatedPost} },
      { new: true }
    );
  };

  const updateModifiedPost = (id, post) => PostModel.findByIdAndUpdate(id, post, { new:true });

  const deleteById = (id) => PostModel.findByIdAndRemove(id);

  return {
    findAll,
    countAll,
    findBySearch,
    findById,
    add,
    updateById,
    updateModifiedPost,
    deleteById
  };
}
