const mongoose = require("mongoose");

const HomeAboutSchema = new mongoose.Schema({
  aboutContentImage: {
    type: String,
    required: true,
  },
  aboutContentText: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("HomeAbout", HomeAboutSchema);
