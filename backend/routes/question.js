const express = require('express');
const {
    getQuestions,
    getQuestion,
    createNewQuestion,
    deleteQuestion,
    updateQuestionReplyId
} = require('../controllers/questionController');

const router = express.Router();

// GET all questions
router.get('/', getQuestions);

// GET a single question
router.get('/:id', getQuestion);

// CREATE a new question
router.post('/newquestion', createNewQuestion);

// DELETE a question
router.delete('/:id', deleteQuestion);

// POST question replyId
router.post('/addReplyId/:id', updateQuestionReplyId)

module.exports = router;