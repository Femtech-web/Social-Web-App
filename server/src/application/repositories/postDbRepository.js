export default function postRepository(repository) {
  const findAll = (params) => repository.findAll(params);
  const countAll = (params) => repository.countAll(params);
  const findBySearch = (searchTerm) => repository.findBySearch(searchTerm);
  const findById = (id) => repository.findById(id);
  const add = (post) => repository.add(post);
  const updateById = (id, post) => repository.updateById(id, post);
  const updateModifiedPost = (id, post) => repository.updateModifiedPost(id, post);
  const deleteById = (id) => repository.deleteById(id);

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
