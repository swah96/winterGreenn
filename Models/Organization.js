const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
    name: String,
    Location: String,
    website: String,
})

module.exports = mongoose.model('Organization', OrganizationSchema);