const User = require("../models/User");

const listUsers = async (req, res) => {
  let statusCode = 500;
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(statusCode).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  let statusCode = 500;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      statusCode = 404;
      throw new Error("User not found");
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(statusCode).json({ error: error.message });
  }
};

module.exports = {
  getUser,
  listUsers,
};
