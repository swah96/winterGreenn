const express = require("express");
const mongoose = require("mongoose");
const ExpressError = require("./Utils/ExpressError");
const methodOverride = require("method-override");

const organizations = require("./Routes/Organization");
const vendors = require("./Routes/Vendor");
const staff = require("./Routes/Staff");
const clients =  require("./Routes/Client");

mongoose.connect("mongodb://localhost:27017/winter-green", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, " connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//routes
app.use("/organizations", organizations);
app.use("/vendors", vendors);
app.use("/staff", staff);
app.use("/clients", clients)

app.get("/", (req, res) => {
  res.render("home");
});

//error handler
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong";
  res.status(statusCode).render(message);
});

app.listen(3000, () => {
  console.log("serving 0n port 3000");
});
