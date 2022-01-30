const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 5000;

const HttpError = require("./controllers/http-error");

//setup server port
app.set("port", port);
http.createServer(app);

const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 204,
};

// use express middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

//Importing Routes
const CasesRoutes = require("./routes/cases");
const UsersRoutes = require("./routes/users");

app.use("/api/v1/cases", CasesRoutes);
app.use("/api/v1/users", UsersRoutes);

//Redirect to Indalid URL
app.use((req, res, next) => {
  const error = new HttpError("Invalid URL", 404);
  throw error;
});
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

//Start Server
app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
