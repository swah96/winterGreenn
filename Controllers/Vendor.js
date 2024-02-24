const Vendor = require("../Models/Vendor");

module.exports.index = async (req, res) => {
  const vendors = await Vendor.find({});
  res.render("vendors/index", { vendors });
};

module.exports.renderNewVendor = (req, res) => {
  res.render("vendors/new", { services });
};

module.exports.createVendor = async (req, res, next) => {
  const vendor = new Vendor(req.body.vendor);
  await vendor.save();
  res.redirect(`/vendors/${vendor._id}`);
};

module.exports.showVendor = async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  res.render("vendors/show", { vendor });
};

module.exports.renderEditVendor = async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  res.render("vendors/edit", { vendor, services });
};

module.exports.updateVendor = async (req, res) => {
  const { id } = req.params;
  const vendor = await Vendor.findByIdAndUpdate(id, {
    ...req.body.vendor,
  });
  req.redirect(`/vendors/${vendor._id}`);
};

module.exports.deleteVendor = async (req, res) => {
  const { id } = req.params;
  await Vendor.findByIdAndDelete(id);
  res.redirect("/vendors");
};
