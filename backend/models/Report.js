// backend/models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    report_type: { type: String, required: true },
    generated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: Object, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', reportSchema);
