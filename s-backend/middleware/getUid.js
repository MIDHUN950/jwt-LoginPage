const jwt = require("jsonwebtoken");

const config = process.env;

const verifySession = (req, res, next) => {
  const token = req.sToken.token;
  console.log(token);
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
    req.uid = decoded.uid;
    req.secret = decoded.secret;
    console.log(req.user);
  } catch (err) {
    return res.status(422).send("Invalid Token");
  }
  return next();
};

module.exports = verifySession;