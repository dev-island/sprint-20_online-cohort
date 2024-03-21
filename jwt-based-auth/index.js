require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const passportJWT = require("./lib/passport");

// Routers
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const errorhandler = require("./middleware/errorHandler");

const checkIsAuthenticated = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    console.log("IN AUTH CALLBACK", {
      err,
      user,
      info,
    });
    if (err) {
      throw new Error(err.message);
    }
    if (!user) {
      return res.status(401).json({
        error: "Not authenticated",
      });
    }
    return next();
  })(req, res, next);
};

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then((db) => {
    console.log("Connected to MongoDB");
    return db;
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

passportJWT(passport);

// Routes
app.use("/auth", authRouter);
app.use("/users", checkIsAuthenticated, userRouter);
app.get("/open", (req, res) => {
  return res.status(200).json({ message: "Open route" });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

app.use(errorhandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
