const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/User");

const SECRET = process.env.JWT_SECRET;

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
  console.log("INIT PASSPORT")
  // The JWT payload is passed into the verify callback
  passport.use(
    new Strategy(options, async (payload, done) => {
      console.log("PAYLOAD", payload)
      // Since we are here, the JWT is valid!
      try {
        // Use the user's ID as the "sub" so we can look it up in the DB when a request comes in
        // (see ./jwt.js where set create the token by passing the userID and set it to the sub property)
        const user = await User.findById(payload.sub);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error)
      }
    })
  );
};
