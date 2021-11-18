const jwt = require("jsonwebtoken");

function verification(req, res, next) {
  const aut = req.headers.authorization;
    if (aut) {
    jwt.verify(aut, "secret", (err, user) => {
      if (err) {
        return res.status(403).json("Token invalido");
      }

      next();
    });
  } else {
    res.status(401).json("NO estas autenticado!");
  }
}

module.exports = verification;
