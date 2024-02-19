let Useraccount = require('../models/useraccountModel');
const mongoose = require('mongoose');

// CREATE a new user account
const createNewUser = async(req, res) => {
  const { email, username, role, district, school } = req.body;
  // add user detail to db
  try {
      const useraccount  = await Useraccount.create({email, username, role, district, school});
      res.status(200).json(useraccount);
  } catch (error) {
      res.status(400).json('Error:' + error);
  }
}

// Check username duplication (response to the checkUsernameAvailability function in SignupForm.js)
const checkUserNameDup = async(req, res) => {
  const { username } = req.query;
  try {
    const existingUser = await Useraccount.findOne({ username });
    if (existingUser) {
      return res.json({ isDuplicate: true });
    }
    return res.json({ isDuplicate: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

// Get the user information by email
const getUserInfo = async(req, res) => {
  const email = req.query.email;
  const userInfo = await Useraccount.findOne({email : email});
  if(!userInfo){
    return res.status(404).json({error: 'No such user'});
  }
  res.status(200).json(userInfo);
}

// Update the score and numOfQuestionsAsked
const updateScoreAndQuestionsAsked = async(req, res) => { 
  try {
    const { username } = req.body;
    await Useraccount.findOneAndUpdate({ username }, { $inc: { score: 5 } });
    await Useraccount.findOneAndUpdate({ username }, { $inc: { numOfQuestionsAsked: 1} });

    res.status(200).json({ message: 'updateScoreAndQuestionsAsked updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating updateScoreAndQuestionsAsked ' });
  }
}

// Update the score and numOfRepliesSent
const updateScoreAndRepliesSent = async(req, res) => { 
  try {
    const { username } = req.body;
    await Useraccount.findOneAndUpdate({ username }, { $inc: { score: 10 } });
    await Useraccount.findOneAndUpdate({ username }, { $inc: { numOfRepliesSent: 1 } });

    res.status(200).json({ message: 'updateScoreAndRepliesSent updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating updateScoreAndRepliesSent' });
  }
}

// Update the score and numOfLikesReceived
const updateScoreAndLikesReceived = async(req, res) => { 
  try {
    const { username } = req.body;
    await Useraccount.findOneAndUpdate({ username }, { $inc: { score: 2 } });
    await Useraccount.findOneAndUpdate({ username }, { $inc: { numOfLikesReceived: 1 } });

    res.status(200).json({ message: 'updateScoreAndLikesReceived updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating updateScoreAndLikesReceived' });
  }
}

// Update the score and numOfLikesGave
const updateScoreAndLikesGave = async(req, res) => { 
  try {
    const { username } = req.body;
    await Useraccount.findOneAndUpdate({ username }, { $inc: { score: 2 } });
    await Useraccount.findOneAndUpdate({ username }, { $inc: { numOfLikesGave: 1 } });

    res.status(200).json({ message: 'updateScoreAndLikesGave updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating updateScoreAndLikesGave' });
  }
}

// Get all the user information
const getAllUserInformation = async(req, res) => { 
  try {
    const users = await Useraccount.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {
  createNewUser,
  checkUserNameDup,
  getUserInfo,
  updateScoreAndQuestionsAsked,
  updateScoreAndRepliesSent,
  updateScoreAndLikesReceived,
  updateScoreAndLikesGave,
  getAllUserInformation
};