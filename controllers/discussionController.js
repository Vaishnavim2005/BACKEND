const Discussion = require('../models/Discussion');

// Get all discussions
const getAllDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find();
        res.status(200).json(discussions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new discussion
const createDiscussion = async (req, res) => {
    const { title, description, createdBy } = req.body;

    if (!title || !description || !createdBy) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const discussion = new Discussion({ title, description, createdBy });
        const savedDiscussion = await discussion.save();
        res.status(201).json(savedDiscussion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Like a discussion
const likeDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findByIdAndUpdate(
            req.params.id,
            { $inc: { likeCount: 1 } },
            { new: true }
        );
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found.' });
        }
        res.status(200).json(discussion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Dislike a discussion
const dislikeDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findByIdAndUpdate(
            req.params.id,
            { $inc: { dislikeCount: 1 } },
            { new: true }
        );
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found.' });
        }
        res.status(200).json(discussion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a reply to a discussion
const addReply = async (req, res) => {
    const { replyText, repliedBy } = req.body;

    if (!replyText || !repliedBy) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found.' });
        }

        discussion.replies.push({ replyText, repliedBy });
        const updatedDiscussion = await discussion.save();
        res.status(200).json(updatedDiscussion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllDiscussions,
    createDiscussion,
    likeDiscussion,
    dislikeDiscussion,
    addReply,
};
