const Client = require("../Models/Client");

module.exports.index = async (req, res) => {
  const client = await Client.find({});
  res.render("client/index", { client });
};

module.exports.renderNewClient = (req, res) => {
  res.render("client/new");
};

module.exports.createClient = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const client = new Client({ email, username });
    const registeredClient = await Client.register(client, password);
    req.login(registeredClient, (err) => {
      if (err) return next(err);
      res.redirect("");
    });
  } catch (e) {
    res.redirect("/register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("");
};

module.exports.login = (req, res) => {
  const redirectUrl = req.session.returnTo || "";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout(function (e) {
    if (e) {
      return next(e);
    }

    res.redirect("/");
  });
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
