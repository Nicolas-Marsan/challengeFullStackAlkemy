const jwt = require("jsonwebtoken");

function verification(req, res, next) {
  const aut = req.headers.authorization;
    if (aut) {
    jwt.verify(aut, "secret", (err, user) => {
      if (err) {
        return res.status(403).json("Token is invalid");
      }

      next();
    });
  } else {
    res.status(401).json("You are not authenticated!!!");
  }
}

module.exports = verification;
