const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CologneSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
    scentNotes: [{ type: Schema.Types.ObjectId, ref: "Scent", required: true }],
    description: { type: String, required: true }
});

CologneSchema.virtual("url").get(function() {
    return `/catalog/cologne/${this._id}`;
});

module.exports = mongoose.model("Cologne", CologneSchema);