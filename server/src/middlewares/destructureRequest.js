const destructureRequestMiddleware = (req, res) => {
  // Get the body of the request if there is one
  let body = null;

  if (req.method === 'POST' || req.method === 'PUT') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      body = body;
    });
  }

  res.locals = {
    ...res.locals,
    body: JSON.parse(body || '{}'),
    url: req.url,
    method: req.method
  }

  return { req, res, continue: true };
};

export default destructureRequestMiddleware;