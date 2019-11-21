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
    },
    colors: {
        type: Array,
        required: true
    },
    rowsAmount: {
        type: Number,
        required: true,
    },
    columnAmount: {
        type: Number,
        required: true
    }
}, { autoIndex: false, versionKey: false });

const Picture = mongoose.model('Picture', pictureScheme, 'pictures');

module.exports = Picture;
