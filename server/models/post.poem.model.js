const mongoose = require("mongoose");

const PostPoemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    date: Date,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  linkPublished: {
    type: String,
    required: false,
  },
  linkBuy: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("PostPoem", PostPoemSchema);
