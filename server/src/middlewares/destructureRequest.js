const destructureRequestMiddleware = (req, res) => {
  // Get the body of the request if there is one
  let body = null;

  if (req.method === 'POST' || req.method === 'PUT') {
    body = '';
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

  console.log("res body----------------------------------------------");
  console.log(res.locals);
  console.log("body----------------------------------------------");
  console.log(body);
  console.log("----------------------------------------------");


  return { req, res, continue: true };
};

module.exports = destructureRequestMiddleware;