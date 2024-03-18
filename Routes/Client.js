const express = require("express");
const router = express.Router();
const passport = require("passport");
const clients = require("../Controllers/Client");
const catchAsync = require("../Utils/catchAsync");
const { isLoggedIn, storeReturnTo } = require("../mddleware");
const ExpressError = require("../Utils/ExpressError");
const Client = require("../Models/Client");

//get request to display all client in db
router.get("/", catchAsync(clients.index));

//get request for creating a new client
router.get("/new", clients.renderNewClient);

//post request to add new client to db
router.post("/", catchAsync(clients.createClient));

//render login
router.get("/login", clients.renderLogin);

//log in with username and password using passport
router.post(
  "/login",
  // use the storeReturnTo middleware to save the returnTo value from session to res.locals
  storeReturnTo,
  // passport.authenticate logs the user in and clears req.session
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  clients.login
);

//log out user by destroying session data
router.get("/logout", clients.logout);

//parameter to find and show specific client
router.get("/:id", catchAsync(clients.showClient));

// Edit route - shows edit form with current data
router.get("/:id/edit", isLoggedIn, catchAsync(clients.renderEditClient));

// PUT request to update an existing entry in the DB
router.put("/:id", isLoggedIn, catchAsync(clients.updateClient));

//delete request to delete client from db
router.delete("/:id", isLoggedIn, catchAsync(clients.deleteClient));

module.exports = router;
