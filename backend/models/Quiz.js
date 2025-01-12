const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String }],
    correctAnswer: { type: String },
    timer: { type: Number, default: 60 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Quiz', quizSchema);
