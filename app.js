const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const ExpressError = require("./Utils/ExpressError");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Client = require("./Models/Client");

const mongoSanitize = require("express-mongo-sanitize");

const organizations = require("./Routes/Organization");
const vendors = require("./Routes/Vendor");
const staff = require("./Routes/Staff");
const clients = require("./Routes/Client");

const MongoStore = require("connect-mongo");

const dbUrl = process.env.DB_URL ||'mongodb://localhost:27017/winter-green';

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

const secret = process.env.SECRET || "thisshouldbeabettersecret!";

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret,
  },
});

store.on("error", function (e) {
  console.log("Session store error", e);
});

const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Client.authenticate()));

passport.serializeUser(Client.serializeUser());
passport.deserializeUser(Client.deserializeUser());

//routes
app.use("/organizations", organizations);
app.use("/vendors", vendors);
app.use("/staff", staff);
app.use("/clients", clients);

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
