const passport = require("passport");
const User = require("../models/User");
const { getToken } = require("../lib/jwt");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "User doesn't exist" });
    }
    // use the helper method `authenticate` from the User model (added by passport-local-mongoose plugin)
    // will verify the password and return the user if it's correct
    user.authenticate(password, (err, user, info) => {
      console.log("IN AUTH CALLBACK", {
        err,
        user,
        info,
      });

      if (err) {
        next(err);
      }

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // if the user is authenticated, we generate a token and send it back
      const token = getToken(user._id);
      res.status(200).json({ data: { accessToken: `Bearer ${token}` } });
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    User.register(new User({ username }), password, (err, user) => {
      if (err) {
        next(err);
      }

      const token = getToken({ _id: user._id, username: user.username });
      res.status(201).json({ data: { accessToken: `Bearer ${token}` } });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
  logout,
};
