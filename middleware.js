const jwt = require("jsonwebtoken");
const users = [];

const withAuth = function (req, res, next) {
  console.log("middleware...");
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;

  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, process.env.AUTH_SECRET, function (err, decoded) {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        const email = decoded.email;
        if (users.includes(email)) {
          req.email = email;
          next();
        }
        else {
          res.status(401).send("Unauthorized: Invalid email");
        }

      }
    });
  }
};

const login = function (email) {
  if (!users.includes(email)) {
    console.log("login...");
    console.log(users);
    users.push(email);
    console.log(users);
  }
};

const logout = function (email) {
  if (!users.includes(email)) {
    console.log("logout...");
    console.log(users);
    let i = users.indexOf(email);
    users.splice(i, 1);
    console.log(users);
  }
};

module.exports = withAuth;
module.exports = {
  withAuth: withAuth,
  login: login,
  logout: logout
};
