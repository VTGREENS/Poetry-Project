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
  attribution:{
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
  amazonLink: {
    type: String,
    required: false,
  } ,
  unsolicitedPressLink: {
    type: String,
    required: false,
  } ,
  barnesAndNobleLink: {
    type: String,
    required: false,
  } ,
  signedPrice: {
    type: String,
    required: false,
  },
  signedLink: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('WorksPhysical', WorksPhysicalSchema);
