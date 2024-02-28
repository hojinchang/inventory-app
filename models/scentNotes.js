const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScentNotesSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        enum: [
            'Citrus',
            'Woody',
            'Floral',
            'Spicy',
            'Aquatic',
            'Fresh',
            'Oriental',
            'Fruity',
            'Herbal',
            'Green',
            'Musk',
            'Amber',
            'Vanilla',
            'Leather',
            'Chypre',
            'Gourmand',
            'Iris',
            'Tobacco',
            'Cocoa',
            'Cardamom',
            'Bergamot',
            'Tonka Bean'
        ]
    }
});

// Set the scent note page url
ScentNotesSchema.virtual("url").get(function() {
    return `/catalog/scent/${this._id}`;
});

module.exports = mongoose.model("Scent", ScentNotesSchema);