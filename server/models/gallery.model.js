const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  imageURL: {
    type: String,
    required: true,
  },
  imageAltText: {
    type: String,
    required: true,
  },
  attribution: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model("Gallery", GallerySchema);