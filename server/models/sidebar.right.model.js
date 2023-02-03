const mongoose = require('mongoose');

const SidebarRightSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    imageAltText: {
        type: String,
        required: true,
    },
    excerpt: {
        type: String,
        required: true,
    },
    infoLink: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('SidebarRight', SidebarRightSchema);