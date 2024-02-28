const mongoose = require("mongoose");
const { DateTime } = require("luxon");

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

BrandSchema.virtual("year_established_formatted").get(function() {
    return this.year_established
        ? DateTime.fromJSDate(this.year_established).toLocaleString(DateTime.DATE_MED)
        : "";
});

module.exports = mongoose.model("Brand", BrandSchema);