const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    replyText: { type: String, required: true },
    repliedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const discussionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true },
    likeCount: { type: Number, default: 0 },
    dislikeCount: { type: Number, default: 0 },
    replies: [replySchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Discussion', discussionSchema);

