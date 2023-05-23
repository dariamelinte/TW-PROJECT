async function authRouter (res, pool) {
  try {
    // TODO: Implement auth router

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello from auth' }));
    
    return res;
  } catch (err) {
    console.error(err);

    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error' }));
    
    return res;
  }
}

module.exports = authRouter;