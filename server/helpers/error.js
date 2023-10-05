const errorHandler = (err, next) => {
  if (!err.type) {
    const error = new Error("Something went wrong");
    error.type = "systemProcessingFailure";
    error.status = 500;
    next(error);
  } else if (!err.status) {
    err.status = 500;
    next(err);
  }
};

module.exports = { errorHandler };
