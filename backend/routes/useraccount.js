const express = require('express');

const {
    createNewUser,
    checkUserNameDup,
    getUserInfo,
    updateScoreAndQuestionsAsked,
    updateScoreAndRepliesSent,
    updateScoreAndLikesReceived,
    updateScoreAndLikesGave,
    getAllUserInformation
} = require('../controllers/useraccountController');


const router = express.Router();

// CREATE a new user account
router.post('/newuser', createNewUser);

// Check username duplication
router.get('/checkUsername', checkUserNameDup );

// GET the corresponding userinfo
router.get('/getUserInfo', getUserInfo);

// Update the score and numOfQuestionsAsked
router.put('/updateScoreAndQuestionsAsked' , updateScoreAndQuestionsAsked);

// Update the score and numOfRepliesSent
router.put('/updateScoreAndRepliesSent', updateScoreAndRepliesSent)

// Update the score and numOfLikesReceived
router.put('/updateScoreAndLikesReceived', updateScoreAndLikesReceived)

// Update the score and numOfLikesGave
router.put('/updateScoreAndLikesGave', updateScoreAndLikesGave)

// Get all the user information
router.get('/getAllUserInformation', getAllUserInformation)

module.exports = router;
