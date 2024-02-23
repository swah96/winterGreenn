const express = require("express");
const router = express.Router();
const catchAsync = require("../Utils/catchAsync");
const ExpressError = require("../Utils/ExpressError");
const Staff = require("../Models/Staff");

// GET request to display all staff in the database
router.get(
  "/",
  catchAsync(async (req, res) => {
    const staff = await Staff.find({});
    res.render("staff/index", { staff });
  })
);

// Get request for creating a new staff
router.get("/new", (req, res) => {
  res.render("staff/new");
});

//post request to add new staff to db
router.post(
  "/",
  catchAsync(async (req, res, next) => {
    const staff = new Staff(req.body.staff);
    await staff.save();
    res.redirect(`/staff/${staff._id}`);
  })
);

//get request to find a specific staff
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const staff = await Staff.findById(req.params.id);
    res.render("/staff/show", { staff });
  })
);

// Edit route - shows edit form with current data
router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const staff = await Staff.findById(req.params.id);
    res.render("staff/edit", { staff });
  })
);

// PUT request to update an existing entry in the DB
router.put(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const staff = await Staff.findByIdAndUpdate(id, {
      ...req.body.staff,
    });
    res.redirect(`/staff/${staff._id}`);
  })
);

// DELETE request to remove staff from database
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Staff.findByIdAndDelete(id);
    res.redirect("/staff");
  })
);

module.exports = router;
