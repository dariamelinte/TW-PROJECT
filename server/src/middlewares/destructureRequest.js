const { methods } = require('../utils/routes');

const destructureRequestMiddleware = async (req, res) => {
  res.locals = {
    ...res.locals,
    url: req.url,
    method: req.method
  };

  if (req.method === methods.GET || req.method === methods.DELETE) {
    return { req, res, continue: true };
  }

  // Get the body of the request if there is one
  let body = '';
  await req.on('data', (chunk) => {
    body += chunk.toString();
  });
  await req.on('end', () => {
    body = body;
  });

  res.locals = {
    ...res.locals,
    body: JSON.parse(body)
  };

  return { req, res, continue: true };
};

module.exports = destructureRequestMiddleware;
