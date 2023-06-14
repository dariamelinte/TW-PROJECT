async function authRouter (req, res, pool) {
  try {

    // reading the incoming request data
    let requestData = '';
    for await (const chunk of req){
      requestData += chunk;
    }

    // parse the request data as json
    const requestPayload = JSON.parse(requestData);
    const { email, password } = requestPayload;

    
    // check if email and passwd are provided
    if( !email || !password ){
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Email and password are required' }));
      
      return res;
    }

    // find the user with the provided email in the database
    const client = await pool.connect();
    const query = 'SELECT * FROM public."user" WHERE email = $1';
    const result = await client.query(query, [email]);
    const user = result.rows[0];

    if (!user) {
      // if no user is found
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'This user does not exist' }));
    }else if (user.password == password){
      // if passwords match
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Authentication successful' }));
    }else {
      //if passwords do not match
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Incorrect password' }));
    }

    client.release();
    return res;
  } catch (err) {
    console.error(err);

    // authentication is not successful
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error' }));
    
    return res;
  }
}

module.exports = authRouter;