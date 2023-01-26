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
  description: {
    type: String,
    required: true,
  },
  msrp: {
    type: String,
    required: true,
  },
  linkAmazon: {
    type: String,
    required: false,
  } ,
  linkUP: {
    type: String,
    required: false,
  } ,
  linkBaN: {
    type: String,
    required: false,
  } ,
  signedPrice: {
    type: String,
    required: false,
  },
  linkSigned: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('WorksPhysical', WorksPhysicalSchema);
