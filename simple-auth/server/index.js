require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");

// Routers
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Connect to db
app.use(async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("CONNECTED TO DB SUCCESSFULLY");
    next();
  } catch (err) {
    next(err);
  }
});

// Routes
app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});
