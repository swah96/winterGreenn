const express = require("express");
const router = express.Router();
const vendor = require("../Controllers/Vendor");
const catchAsync = require("../Utils/catchAsync");
const ExpressError = require("../Utils/ExpressError");
const Vendor = require("../Models/Vendor");

const services = ["accomodation", "transport", "flight"];

//Get request to display all vendors in the database
router.get("/", catchAsync(vendor.index));

//GET request to create a new form for adding a new vendor
router.get("/new", vendor.renderNewVendor);

//POST request to handle submission of the add vendor form
router.post("/", catchAsync(vendor.createVendor));

//parameter to find and show a specific vendor information
router.get("/:id", catchAsync(vendor.showVendor));

// Edit route - shows edit form with current data
router.get("/:id/edit", catchAsync(vendor.renderEditVendor));

// Update route - updates database with changes made in edit form
router.put("/:id", catchAsync(vendor.updateVendor));

//delete request to remove vendor from db
router.delete("/:id", catchAsync(vendor.deleteVendor));

module.exports = router;
