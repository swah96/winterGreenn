const express = require("express");
const router = express.Router();
const catchAsync = require("../Utils/catchAsync");
const ExpressError = require("../Utils/ExpressError");
const Vendor = require("../Models/Vendor");

const services = ["accomodation", "transport", "flight"];

//Get request to display all vendors in the database
router.get(
  "/",
  catchAsync(async (req, res) => {
    const vendors = await Vendor.find({});
    res.render("vendors/index", { vendors });
  })
);

//GET request to create a new form for adding a new vendor
router.get("/new", (req, res) => {
  res.render("vendors/new", { services });
});

//POST request to handle submission of the add vendor form
router.post(
  "/",
  catchAsync(async (req, res, next) => {
    const vendor = new Vendor(req.body.vendor);
    await vendor.save();
    res.redirect(`/vendors/${vendor._id}`);
  })
);

//parameter to find and show a specific vendor information
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const vendor = await Vendor.findById(req.params.id);
    res.render("vendors/show", { vendor });
  })
);

// Edit route - shows edit form with current data
router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const vendor = await Vendor.findById(req.params.id);
    res.render("vendors/edit", { vendor, services });
  })
);

// Update route - updates database with changes made in edit form
router.put(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const vendor = await Vendor.findByIdAndUpdate(id, {
      ...req.body.vendor,
    });
    req.redirect(`/vendors/${vendor._id}`);
  })
);

//delete request to remove vendor from db
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Vendor.findByIdAndDelete(id);
    res.redirect("/vendors");
  })
);

module.exports = router;
