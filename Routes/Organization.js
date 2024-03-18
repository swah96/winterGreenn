const express = require("express");
const router = express.Router();
const organizations = require("../Controllers/Organization");
const catchAsync = require("../Utils/catchAsync");
const ExpressError = require("../Utils/ExpressError");
const Organization = require("../Models/Organization");

// GET request to display all organizations in the database
router.get("/", catchAsync(organizations.index));

// GET request for creating a new organization
router.get("/new", organizations.renderNewOrg);

// POST request to add an organization to the database
router.post("/", catchAsync(organizations.createOrg));

// Route parameter to find and show a specific organization's information
router.get("/:id", catchAsync(organizations.showOrg));

// Edit route - shows edit form with current data
router.get("/:id/edit", catchAsync(organizations.renderEditOrg));

// PUT request to update an existing entry in the DB
router.put("/:id", catchAsync(organizations.updateOrg));

// DELETE request to remove organization from DB
router.delete("/:id", catchAsync(organizations.deleteOrg));

module.exports = router;
