require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const User = require("./models/User");
const passport = require("passport");
const errorhandler = require("./middleware/errorHandler");
const { Strategy, ExtractJwt } = require("passport-jwt");

const SECRET = process.env.JWT_SECRET;
// Routers
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");

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

  // At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};
passport.use(
  new Strategy(options, async (payload, next) => {
    console.log("PAYLOAD", payload);
    // Since we are here, the JWT is valid!
    try {
      // Use the user's ID as the "sub" so we can look it up in the DB when a request comes in
      // (see ./jwt.js where set create the token by passing the userID and set it to the sub property)
      const user = await User.findById(payload.sub);
      if (!user) {
        return next(null, false);
      }
      return next(null, user);
    } catch (error) {
      return next(error);
    }
  })
);

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


// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWZkMGYwZjIwNDJiOGM3YmY1MWUzODAiLCIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsidXNlcm5hbWUiOiJyZXF1aXJlIn0sInN0YXRlcyI6eyJyZXF1aXJlIjp7InVzZXJuYW1lIjp0cnVlfSwiZGVmYXVsdCI6e30sIm1vZGlmeSI6e319fSwib3AiOm51bGwsInNhdmluZyI6bnVsbCwiJHZlcnNpb25FcnJvciI6bnVsbCwic2F2ZU9wdGlvbnMiOm51bGwsInZhbGlkYXRpbmciOm51bGwsImNhY2hlZFJlcXVpcmVkIjp7fSwiYmFja3VwIjp7ImFjdGl2ZVBhdGhzIjp7Im1vZGlmeSI6eyJ1c2VybmFtZSI6dHJ1ZSwic2FsdCI6dHJ1ZSwiaGFzaCI6dHJ1ZX0sImRlZmF1bHQiOnsiX2lkIjp0cnVlfX0sInZhbGlkYXRpb25FcnJvciI6bnVsbH0sImluc2VydGluZyI6dHJ1ZSwic2F2ZWRTdGF0ZSI6e319LCJfZG9jIjp7InVzZXJuYW1lIjoidGVzdDQiLCJfaWQiOiI2NWZkMGYwZjIwNDJiOGM3YmY1MWUzODAiLCJzYWx0IjoiMzBhMjk1MTJlOTY2NjYxNTRmZGM0MjcwZGUxNzMwMWZmMGIwNWYwODRkNzViYmVmMmU2NjY4NTZiNzJmMGUwMSIsImhhc2giOiJiMDJhOTE4NWE3Mzc4MDdmZjNhZDgzNDUzZjI1Nzg1NjhiYTA1Y2I4OGU2MDk5OThlOGIxMTc4OGNiZjAwZGI0NThmZmFlMDFkNDU5ZTUxNTU5ZjdiOGU5YjJjNzVjZGRiMTE4MmI3Yzg0ZmY3ZjVhMTg0OGFmMDRmYjI0NWE5MGQwNjBjNjQ5OTlhZDk3YWVhODllZGQ0NGRiOTExZjI2Y2VmNzdjYmJmZmQ3MGRlZmZjMDQ2M2I2YTA2OWM5ZGExMzE4ZDI2MDAwY2EzZDg5ZGFlYTljOGRhN2UzMWZmNjM4OTEyYTQ0ZjdmMDgxMGJlZjA2N2ZjYWJkNDU5MDBjYjAzZWNlMTFlNThlYTNjZjFkODE0OGJlZTlmNDg1NjgxNDRlODM5ODY1NTAwMzcxOGVjZWM2Zjk3MTZiMzk2OGM1ZmI2ZDI2YTg3YzcxNmY5MmU3YzNhOWFiZDU2OGU1NTZiMWI5NDYzYTdhNjI5MjM0ZjAyNzI1NGYyODQyZWQ0MGI0MTEyMDQ1ODVjOWNiYmUxZjIzOTYwYzMxY2NjNDRlNjhkZjE2ZDE4YzdjYmI2NWJmYTA3NmVjYjQ3ZTk4OWFiYWExZTBlYzg4NTZiYmRkODE1OThjOGU1ZjczYWIxOWM4NTZhMjE0N2FmZTUwOTk4ZDdlZGYyNGIxZWM3MTQ5YWU5ZGQ3M2NiYmE5MWU4ZmJhN2MyZGMyZTZmZDhiYjczYzgzNDQ0MTljM2FhNjJkZGY5NTk4ODE1NWJhNTE4OWE0YmUwNjAzMjRjOTQ2ODllNTQ4YTU5Y2Q1ZTA4ZGRkMDBhNDY2MjdjNzExZDNlM2RmYzE5ODE4NDVjNGNlZWNkM2E4YjFlNzdjMWUwNmYxODMxZGI1MzYwNjQ1MTY4ZjMyY2QyYWI5ZWE1ZWEyODE4NGMwMDEyMjVhNzEyYTdmZjg2MTkyZDMyYzE2MDY1NDMzNDFlYjlhMzA0ZGRlMDIzODkxMWVjN2EwMGYzNGNlNTk1M2RjZGViNjY3M2NkNzBjM2U4NGJjOTgwYzM0NTQwMTg3ZWU5NzZkM2IxYTU1OTA4NDYzOGU2MjYyOTNkOGY0MDk1Zjk3YTJmOGViNjFlYjU4OWE0MTI4MTcxOTQ5ZGNiOWEzYzMyZGYwODRmMWIzNWQwZGUwYTA0YTRhMWJmMDBiZTQ5ZDJmNjU3MzRjYTYzM2QwYTU5M2UzNWM5MWViZGUwYTA0YmNhZTE0YTg0NWMxOTJlMWQxNmI2YjYzYzc1NGFmMTc3ODhmYTJlMWQ2MWQ2MDc1YTZiMzYyOWNiMjA0M2MyZTY5Y2RiMDhlNTg1YmZiMTU1ZjJiMGNkOTNmOGU4YThiMzY2MzYxIiwiX192IjowfSwiJGlzTmV3IjpmYWxzZSwiaWF0IjoxNzExMDgzMjc5LCJleHAiOjE3MTEwODY4Nzl9.iysCpY1Csyh-ogQftJ2BTQ5Xc5VBlallSDQw19XhnA4";