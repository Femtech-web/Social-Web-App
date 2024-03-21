export default function redisCachingMiddleware(redisClient, key) {
  return function (req, res, next) {
    const params = req.params.id || '';
    redisClient.get(`${key}_${params}`, (err, data) => {
      if (err) {
        console.log(err);
      }
      if (data) {
        return res.status(200).json(JSON.parse(data));
      }
      return next();
    });
  };
}
