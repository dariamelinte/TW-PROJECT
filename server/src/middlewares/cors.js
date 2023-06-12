const { methods } = require('../utils/routes');
const { headers } = require('../utils/headers');

const corsMiddleware = async (req, res) => {
  if (req.method !== methods.OPTIONS) {
    return false;
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Request-Headers', '*');
  res.writeHead(200, headers);
  res.end(JSON.stringify({ message: 'CORS Allowed' }));

  return true;
};

module.exports = corsMiddleware;
