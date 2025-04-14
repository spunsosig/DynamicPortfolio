const csurf = require('csurf');
const hpp = require('hpp');
const { sanitizeInput } = require('../utils/sanitization');

const sanitizeMiddleware = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeInput(req.body);
  }
  next();
};

module.exports = {
  csrfProtection: csurf({ cookie: true }),
  preventParamPollution: hpp(),
  sanitizeData: sanitizeMiddleware
};