const express = require('express');
const {
    getReplies,
    createNewReply,
    getUserReplies,
    addUserLikeClick,
    fetchLikedReplies
} = require('../controllers/replyController');

const router = express.Router();

// GET all replies from a single question 
router.get('/:id', getReplies)

// CREATE a new reply
router.post('/newreply', createNewReply)

// GET user replies from a single user
router.get('/user/:username', getUserReplies)

// DELETE a reply

// Update a reply when like clicked
router.post('/like/:replyId', addUserLikeClick)

// fetch the liked reply from user
router.get('/liked/:id', fetchLikedReplies)

module.exports = router;