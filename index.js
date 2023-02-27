const express = require("express");
const bodyParser = require("body-parser");
const usersRoutes = require("./api/routes/user");
const questionRoutes= require("./api/routes/questions")
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

var cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true })
  .then(console.log("connected"))
  .catch((err) => {
    console.log("fak this");
    console.log(err);
  });

app.use(questionRoutes);
app.use(usersRoutes);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.listen(3000);