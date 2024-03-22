export default function redisPostRepository(repository) {
  const setCache = (options) => repository.setCache(options);
  const delCache = (key) => repository.delCache(key);
  return {
    setCache,
    delCache,
  };
}
