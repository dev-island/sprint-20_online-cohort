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
 * LEARN MORE ABOUT resave and saveUninitialized:
 *  https://stackoverflow.com/questions/40381401/when-to-use-saveuninitialized-and-resave-in-express-session
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

/* Configure session management.
 *
 * When a login session is established, information about the user will be
 * stored in the session.  This information is supplied by the `serializeUser`
 * function, which is yielding the user ID and username.
 *
 * As the user interacts with the app, subsequent requests will be authenticated
 * by verifying the session.  The same user information that was serialized at
 * session establishment will be restored when the session is authenticated by
 * the `deserializeUser` function.
 *
 * Since every protected request to the app needs the user ID and username that
 * information is stored in the session.
 * 
 * here we use passport-local-mongoose to handle the serialization and deserialization 
 * essentially, it's a helper that will automatically add the user information to to the request object so we can access it from our controllers
 * 
 * Here's an example without using passport-local-mongoose:
 * passport.serializeUser(function(user, cb) {
  
process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });

  * Read more here [What does serialize and deserialize mean](https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize)

  * Summary of passport methods and middleware

passport.initialize middleware is invoked on every request. It ensures the session contains a passport.user object, which may be empty.
passport.session middleware is a Passport Strategy which will load the user object onto req.user if a serialised user object was found in the server.
passport.deserializeUser is invoked on every request by passport.session. It enables us to load additional user information on every request. This user object is attached to the request as req.user making it accessible in our request handling.
Our Local Strategy is only invoked on the route which uses the passport.authenticate middleware.
Only during this authentication passport.serializeUser is invoked allowing us the specify what user information should be stored in the session.
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
