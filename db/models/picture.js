const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pictureScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    pixels: {
        type: Array,
        required: true
    }
}, { autoIndex: false, versionKey: false });

const Picture = mongoose.model('Picture', pictureScheme);

module.exports = Picture;
