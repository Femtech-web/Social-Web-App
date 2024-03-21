const sendProError = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        error: err.message,
      });
    }

    console.log('ERROR 🔥:', err);
    return res.status(500).json({
      title: 'Something went very wrong!',
      error: err.message,
    });
  }

  return res.status(err.statusCode).json({
    error: 'Something went wrong! Please try again later.'
  });
};

export default  (err, req, res, next) => {
  sendProError(err, req, res);
};