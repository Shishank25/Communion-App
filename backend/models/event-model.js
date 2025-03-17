const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema ({
    title: { type: String },
    description: { type: String },
    category: { type: String },
    date: { type: Date },
    location: { type: String },
    userId: { type: String, required: true },
    popularity: { type: Number, default: 0 },
    createdOn: { type: Date, default: new Date() },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
        index: { expires: 0 }, 
    },
});

module.exports = mongoose.model("Event", eventSchema);