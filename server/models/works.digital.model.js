const mongoose = require("mongoose");

const WorksDigitalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  linkUrl: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("WorksDigital", WorksDigitalSchema);
