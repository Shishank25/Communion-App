const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema ({
    title: { type: String },
    description: { type: String },
    category: { type: String },
    date: { type: Date, required: true },
    toDate: { type: Date },
    location: { type: String },
    userId: { type: String, required: true },
    popularity: { type: Number, default: 0 },
    createdOn: { type: Date, default: Date.now },
    expiresAt: {
        type: Date,
        index: { expires: 0 }, 
    },
});

eventSchema.pre("save", function (next) {
    if (!this.expiresAt && this.toDate) {
        this.expiresAt = new Date(this.toDate.getTime() + 24 * 60 * 60 * 1000);
    }
    next();
});

module.exports = mongoose.model("Event", eventSchema);