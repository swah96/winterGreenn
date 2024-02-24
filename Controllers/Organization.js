const Organization = require("../Models/Organization");

module.exports.index = async (req, res) => {
  const organization = await Organization.find({});
  res.render("organiztions/index", { organization });
};

module.exports.renderNewOrg = (req, res) => {
  res.render("organiztions/new");
};

module.exports.createOrg = async (req, res, next) => {
  const organization = new Organization(req.body.organization);
  await organization.save();
  res.redirect(`/organizations/${organization._id}`);
};

module.exports.showOrg = async (req, res) => {
  const organization = await Organization.findById(req.params.id);
  res.render("organizations/show", { organization });
};

module.exports.renderEditOrg = async (req, res) => {
  const organization = await Organization.findById(req.params.id);
  res.render("organizations/edit", { organization });
};

module.exports.updateOrg = async (req, res) => {
  const { id } = req.params;
  const organization = await Organization.findByIdAndUpdate(id, {
    ...req.body.organization,
  });
  req.redirect(`/organizations/${organization._id}`);
};

module.exports.deleteOrg = async (req, res) => {
  const { id } = req.params;
  await Organization.findByIdAndDelete(id);
  res.redirect("/Organizations");
};
