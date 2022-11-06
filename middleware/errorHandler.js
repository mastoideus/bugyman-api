const { logEvent } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logEvent(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errorLog.log"
  );
  console.log(err.stack);

  const status = res.statusCode || 500;
  res.status(status);

  res.json({ message: err.message, isError: true });
};

module.exports = errorHandler;
