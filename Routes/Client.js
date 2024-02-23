const express = require("express");
const router = express.Router();
const catchAsync = require("../Utils/catchAsync");
const ExpressError = require("../Utils/ExpressError");
const Client = require("../Models/Client");

//get request to display all client in db
router.get(
  "/",
  catchAsync(async (req, res) => {
    const client = await Client.find({});
    res.render("client/index", { client });
  })
);

//get request for creating a new client
router.get("/new", (req, res) => {
  res.render("client/new");
});

//post request to add new client to db
router.post(
  "/",
  catchAsync(async (req, res, next) => {
    const client = new Client(req.body.client);
    await client.save();
    res.redirect(`/client/${client._id}`);
  })
);

//parameter to find and show specific client
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const client = await Client.findById(req.params.id).populate(
      "Organization"
    );
    res.render("client/show", { client });
  })
);

// Edit route - shows edit form with current data
router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const client = await Client.findById(req.params.id);
    res.render("client/edit", { client });
  })
);

// PUT request to update an existing entry in the DB
router.put(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const client = await Client.findByIdAndUpdate(id, { ...req.body.client });
    res.redirect(`/clients/${client._id}`);
  })
);

//delete request to delete client from db
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Client.findByIdAndDelete(id);
    req.redirect("/clients");
  })
);

module.exports = router;
