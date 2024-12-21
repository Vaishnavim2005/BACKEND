// backend/routes/discussionRoutes.js

const express = require('express');
const router = express.Router();
const { createDiscussion, getDiscussions } = require('../controllers/discussionController');

router.post('/', createDiscussion); // Create discussion
router.get('/', getDiscussions);   // Get discussions

module.exports = router;
