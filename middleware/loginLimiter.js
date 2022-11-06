const rateLimit = require("express-rate-limit");
const { logEvent } = require("./logger");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message:
      "Too many login attempts from this IP, please try again after 60 seconds.",
  },
  handler: (req, res, next, options) => {
    logEvent(
      `Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "errorLog.log"
    );
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
