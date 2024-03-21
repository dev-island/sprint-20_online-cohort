// Used to create, sign, and verify tokens
const jwt = require("jsonwebtoken");
const passport = require("passport");

exports.getToken = (id) => {
  // create the jwt using the id as the sub
  return jwt.sign({ sub: id }, process.env.JWT_SECRET, { expiresIn: 3600 });
};

// To authenticate on subsequent requests we use passport to handle the JWT verification.
exports.verifyUser = passport.authenticate("jwt", { session: false });
