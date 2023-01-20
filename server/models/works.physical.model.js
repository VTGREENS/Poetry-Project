const mongoose = require('mongoose');

const WorksPhysicalSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  imageAltText: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  msrp: {
    type: String,
    required: true,
  },
  links: [ {
    type: String,
    required: true,
  } ],
  signedPrice: {
    type: String,
    required: true,
  },
  linkSigned: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('WorksPhysical', WorksPhysicalSchema);
