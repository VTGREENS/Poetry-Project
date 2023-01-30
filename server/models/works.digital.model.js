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
    required: false,
  },
  description: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model("WorksDigital", WorksDigitalSchema);
