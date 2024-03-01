const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScentNotesSchema = new Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 100,
    }
});

// Set the scent note page url
ScentNotesSchema.virtual("url").get(function() {
    return `/catalog/scentnote/${this._id}`;
});

module.exports = mongoose.model("Scent", ScentNotesSchema);