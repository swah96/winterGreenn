const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: String,
  address: String,
  organization: [
    {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },
  ],
});

module.exports = mongoose.model("Client", ClientSchema);
