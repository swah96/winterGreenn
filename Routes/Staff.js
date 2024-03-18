const express = require("express");
const router = express.Router();
const staff = require("../Controllers/Staff");
const catchAsync = require("../Utils/catchAsync");
const ExpressError = require("../Utils/ExpressError");
const Staff = require("../Models/Staff");

// GET request to display all staff in the database
router.get("/", catchAsync(staff.index));

// Get request for creating a new staff
router.get("/new", staff.renderNewStaff);

//post request to add new staff to db
router.post("/", catchAsync(staff.createStaff));

//get request to find a specific staff
router.get("/:id", catchAsync(staff.showStaff));

// Edit route - shows edit form with current data
router.get("/:id/edit", catchAsync(staff.editStaff));

// PUT request to update an existing entry in the DB
router.put("/:id", catchAsync(staff.updateStaff));

// DELETE request to remove staff from database
router.delete("/:id", catchAsync(staff.deleteStaff));

module.exports = router;
