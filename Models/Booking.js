const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  organization: [
    {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },
  ],
  client: [
    {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
  ],
  vendor: [
    {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
    },
  ],
  total_cost: Number,
});

module.exports = mongoose.model("Booking", BookingSchema);
