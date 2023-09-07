const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode;
    switch (statusCode) {
      case 400:
        res.json({
          title: "validation error",
          message: err.message,
          stackTrace: err.stackTrace,
        });
        break;
      case 401:
        res.json({
          title: "user not authorized",
          message: err.message,
          stackTrace: err.stackTrace,
        });
        break;
      case 403:
        res.json({
          title: "forbidden",
          message: err.message,
          stackTrace: err.stackTrace,
        });
        break;
      case 404:
        res.json({
          title: "not found",
          message: err.message,
          stackTrace: err.stackTrace,
        });
        break;
      case 500:
        res.json({
          title: "server error",
          message: err.message,
          stackTrace: err.stackTrace,
        });
        break;
      default:
        console.log("error handler default case");
        next();
        break;
    }
  };
  
  module.exports = errorHandler;
  