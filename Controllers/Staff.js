const Staff = require("../Models/Staff");

module.exports.index = async (req, res) => {
  const staff = await Staff.find({});
  res.render("staff/index", { staff });
};

module.exports.renderNewStaff = (req, res) => {
  res.render("staff/new");
};

module.exports.createStaff = async (req, res, next) => {
  const staff = new Staff(req.body.staff);
  await staff.save();
  res.redirect(`/staff/${staff._id}`);
};

module.exports.showStaff = async (req, res) => {
  const staff = await Staff.findById(req.params.id);
  res.render("/staff/show", { staff });
};

module.exports.editStaff = async (req, res) => {
  const staff = await Staff.findById(req.params.id);
  res.render("staff/edit", { staff });
};

module.exports.updateStaff = async (req, res) => {
  const { id } = req.params;
  const staff = await Staff.findByIdAndUpdate(id, {
    ...req.body.staff,
  });
  res.redirect(`/staff/${staff._id}`);
};

module.exports.deleteStaff = async (req, res) => {
  const { id } = req.params;
  await Staff.findByIdAndDelete(id);
  res.redirect("/staff");
};
