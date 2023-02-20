const errorLogger = (err, req, res, next) => {
  console.error(err);
  next(err);
};

const errorResponder = (err, req, res, next) => {
  res.status(err.statusCode || 500).send(err.toString());
};

module.exports = { errorLogger, errorResponder };
