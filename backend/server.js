const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRouter = require("./todoRouter");
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use("/todos", todoRouter);

mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(PORT, () => {
  console.log("Server is running on Port:" + PORT);
});
