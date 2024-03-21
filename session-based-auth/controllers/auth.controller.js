const passport = require("passport");
const User = require("../models/User");

const login = async (req, res, next) => {
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
        return res.status(200).json({ user });
      });
    })(req, res);
  } catch (error) {
    next(error)
  }
};

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    User.register(new User({ username }), password, (err, user) => {
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

const logout = async (req, res) => {
  try {
    req.logOut(() => res.status(200).json({ message: "Logged out" }));
  } catch (error) {
    next(error)
  }
};

module.exports = {
  login,
  register,
  logout,
};
