export function parseJwt(token) {
  const tokenParts = token.split(".");
  const encodedPayload = tokenParts[1];
  const decodedPayload = atob(encodedPayload);
  return JSON.parse(decodedPayload);
}

export function isJwtExpired(token) {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current timestamp in seconds
  const jwt = parseJwt(token);
  const expirationTime = jwt.exp;

  return currentTimestamp >= expirationTime;
}
