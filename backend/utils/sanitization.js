const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const purify = DOMPurify(window);

const sanitizeInput = (data) => {
  if (typeof data === 'object') {
    return Object.keys(data).reduce((acc, key) => ({
      ...acc,
      [key]: typeof data[key] === 'string' ? purify.sanitize(data[key].trim()) : data[key]
    }), {});
  }
  return typeof data === 'string' ? purify.sanitize(data.trim()) : data;
};

module.exports = { sanitizeInput };