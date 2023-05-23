async function userRouter (res, pool) {
  try{
    // TODO: Implement user router
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello from user' }));

    return res;
  } catch (err) {
    console.error(err);

    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error' }));

    return res;
  }
}

module.exports = userRouter;