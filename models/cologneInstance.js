const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CologneInstanceSchema = new Schema({
    cologne: { type: Schema.Types.ObjectId, ref: "Cologne", required: true },
    batchNumber: { type: String, required: true },
    condition: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        enum: [
            "New",
            "Open Box",
            "Display Unit",
        ]
    }
});