const Client = require("../Models/Client");

module.exports.index = async (req, res) => {
  const client = await Client.find({});
  res.render("client/index", { client });
};

module.exports.renderNewClient = (req, res) => {
  res.render("client/new");
};

module.exports.createClient = async (req, res, next) => {
  const client = new Client(req.body.client);
  await client.save();
  res.redirect(`/client/${client._id}`);
};

module.exports.showClient = async (req, res) => {
  const client = await Client.findById(req.params.id).populate("Organization");
  res.render("client/show", { client });
};

module.exports.renderEditClient = async (req, res) => {
  const client = await Client.findById(req.params.id);
  res.render("client/edit", { client });
};

module.exports.updateClient = async (req, res) => {
  const { id } = req.params;
  const client = await Client.findByIdAndUpdate(id, { ...req.body.client });
  res.redirect(`/clients/${client._id}`);
};

module.exports.deleteClient = async (req, res) => {
  const { id } = req.params;
  await Client.findByIdAndDelete(id);
  req.redirect("/clients");
};
