const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CologneInstanceSchema = new Schema({
    cologne: { type: Schema.Types.ObjectId, ref: "Cologne", required: true },
    batchNumber: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    size: { type: String, required: true },
});

CologneInstanceSchema.virtual("url").get(function() {
    return `/catalog/cologneinstance/${this._id}`;
})

module.exports = mongoose.model("CologneInstance", CologneInstanceSchema);