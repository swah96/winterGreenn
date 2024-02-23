const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    name: String,
    email: String,
    phone: Number,
    address: String,
})

module.exports = mongoose.model('Staff', StaffSchema);