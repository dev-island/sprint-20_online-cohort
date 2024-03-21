require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const User = require("./models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const MongoStore = require("connect-mongo");

// Routers
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const errorhandler = require("./middleware/errorHandler.middleware");

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

const checkIsAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({
    error: "Not authenticated",
  });
}

/**
 * See the documentation for all possible options - https://www.npmjs.com/package/express-session
 *
 * secret: This is a random string that will be used to "authenticate" the session.  In a production environment,
 * you would want to set this to a long, randomly generated string
 *
 * resave: when set to true, this will force the session to save even if nothing changed.  If you don't set this,
 * the app will still run but you will get a warning in the terminal
 *
 * saveUninitialized: Similar to resave, when set true, this forces the session to be saved even if it is uninitialized
 */
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      dbName: "simple-auth",
    }),
  })
);

/*
Setup the local passport strategy, add the serialize and 
deserialize functions that only saves the ID from the user
by default.
*/
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

// Routes
app.use("/auth", authRouter);
app.use("/users", checkIsAuthenticated, userRouter);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

app.use(errorhandler)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
