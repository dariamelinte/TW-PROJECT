const { constants } = require("buffer");

async function authRouter (req, res, pool) {
  console.log("Check 1");
  //console.log(req);
  try {
    console.log("Check 2");
    // reading the incoming request data
    // let requestData = '';

    // for await (const chunk of req){
    //   requestData += chunk;
    //   console.log(chunk);
    // }
    
    // console.log("Check 3");
    // console.log(requestData);
    
    // console.log("Check 4");

    // parse the request data as json
    // const requestPayload = JSON.parse(requestData);
    // console.log("Check 5");
    
    const { body } = res.locals;
    console.log(body);

    const { email, password } = body;

    console.log(email);
    console.log(password);

    
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
    res.end(JSON.stringify({ message: 'Server error 1' }));
    
    return res;
  }
}

module.exports = authRouter;