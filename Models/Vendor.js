const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
  name: String,
  description: String,
  services: {
    type: String,
    enum: ["accomodation", "transport", "flight"],
  },
  phone: Number,
});

module.exports = mongoose.model('Vendor', VendorSchema);
