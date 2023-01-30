const mongoose = require("mongoose");

const PostPoemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  attribution: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
  },
  body: {
    type: String,
    required: true,
  },
  publishedLink: {
    type: String,
    required: false,
  },
  buyLink: {
    type: String,
    required: false,
  },
  imageLink:{
    type: String,
    required: false,
  }
});

module.exports = mongoose.model("PostPoem", PostPoemSchema);
