const mongoose = require("mongoose");

const PostPoemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  attribution: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  body: {
    type: String,
    required: false,
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
  },
  featuredIn:{
    type: String,
    required: false,
  }
});

module.exports = mongoose.model("PostPoem", PostPoemSchema);
