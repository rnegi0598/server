const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  try {
    const authorization =
      req.headers.authorization || req.headers.Authorization;
    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (req.url === "/admin" && decoded.role !== "admin") {
      throw new Error("user is not an admin");
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.statusCode = 400;
    throw new Error(err.message);
  }

};

module.exports = validateToken;
