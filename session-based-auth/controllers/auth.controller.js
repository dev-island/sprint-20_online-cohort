const passport = require("passport");
const User = require("../models/User");

const handleLogin = async (req, res, next) => {
  console.log("logging in user", {
    body: req.body,
    user: req.user,
  })

  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        throw new Error(err.message);
      }
      if (!user) {
        statusCode = 401;
        throw new Error("Invalid username or password");
      }
      req.logIn(user, (err) => {
        if (err) {
          throw new Error(err.message);
          // return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ user });
      });
    })(req, res);
  } catch (error) {
    next(error)
  }
};

const handleRegister = async (req, res, next) => {
  console.log("registering user", {
    body: req.body,
    user: req.user,
  });
  try {
    const { username, password } = req.body;
    User.register(new User({ username }), password, (err, user) => {
      console.log("User has been registered and created", { user, err })
      if (err) {
        next(err);
      }
      req.logIn(user, (err) => {
        if (err) {
          next(err)
        }
        res.status(201).json({ user });
      });
    });
  } catch (error) {
    next(error)
  }
};

const handleLogout = async (req, res) => {
  try {
    req.logOut(() => res.status(200).json({ message: "Logged out" }));
  } catch (error) {
    next(error)
  }
};

module.exports = {
  handleLogin,
  handleRegister,
  handleLogout,
};
