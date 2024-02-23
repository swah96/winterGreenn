const express = require("express");
const router = express.Router();
const catchAsync = require("../Utils/catchAsync");
const ExpressError = require("../Utils/ExpressError");
const Organization = require("../Models/Organization");

// GET request to display all organizations in the database
router.get(
  "/",
  catchAsync(async (req, res) => {
    const organization = await Organization.find({});
    res.render("organiztions/index", { organization });
  })
);

// GET request for creating a new organization
router.get("/new", (req, res) => {
  res.render("organiztions/new");
});

// POST request to add an organization to the database
router.post(
  "/",
  catchAsync(async (req, res, next) => {
    const organization = new Organization(req.body.organization);
    await organization.save();
    res.redirect(`/organizations/${organization._id}`);
  })
);

// Route parameter to find and show a specific organization's information
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const organization = await Organization.findById(req.params.id);
    res.render("organizations/show", { organization });
  })
);

// Edit route - shows edit form with current data
router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const organization = await Organization.findById(req.params.id);
    res.render("organizations/edit", { organization });
  })
);

// PUT request to update an existing entry in the DB
router.put(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const organization = await Organization.findByIdAndUpdate(id, {
      ...req.body.organization,
    });
    req.redirect(`/organizations/${organization._id}`);
  })
);

// DELETE request to remove organization from DB
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Organization.findByIdAndDelete(id);
    res.redirect("/Organizations");
  })
);

module.exports = router;
