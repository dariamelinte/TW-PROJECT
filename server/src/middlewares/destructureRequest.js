const destructureRequestMiddleware = async (req, res) => {
  // Get the body of the request if there is one
  if (req.method === 'POST' || req.method === 'PUT') {
    let body = '';
    await req.on('data', (chunk) => {
      body += chunk.toString();
    });
    await req.on('end', () => {
      body = body;
    });

    res.locals = {
      ...res.locals,
      body: JSON.parse(body),
      url: req.url,
      method: req.method
    }

    return { req, res, continue: true };
  }

  return { req, res, continue: true };
};

module.exports = destructureRequestMiddleware;