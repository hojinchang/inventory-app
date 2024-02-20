const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    country_of_origin: { type: String, required: true, maxLength: 50 },
    year_established: { type: Date }
});

// Set the brand's page url
BrandSchema.virtual("url").get(function() {
    return `/catalog/brand/${this._id}`;
});

module.exports = mongoose.model("Brand", BrandSchema);