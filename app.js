const express = require("express");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config({
  path: "./config.env",
});
const serverStartupLog = require("./utils/serverStartupLog");
const apiRoutes = require("./routes/routes");

// Initialize an instance of the app
const app = express();

// Set API rate limit
const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 1000,
  message: "Too Many Request from this IP, please try again in an hour",
});
app.use(limiter);
// app.use("/api", limiter);

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Routes
app.use(apiRoutes);
// app.use("/api", apiRoutes);

// handle undefined Routes
app.use("*", (req, res) => {
  return res
    .status(404)
    .json({ message: "Error: 404 Not found", errorMessage: "Undefined route" });
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  serverStartupLog();
});
