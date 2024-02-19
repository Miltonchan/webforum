let Reply = require('../models/replyModel');
const mongoose = require('mongoose');

// GET all reply from a single question 
const getReplies = async(req, res) => {
  const { id } = req.params;
    
  const reply = await Reply.find({questionid: id}).sort({createdAt: -1});
    if(!reply){
      return res.status(404).json({error: 'No such reply'});
    }

    res.status(200).json(reply);
}

// CREATE a new reply
const createNewReply = async(req, res) => {
  const{ questionid, username, answer, chapter, page, paragraph, like } = req.body;

  try{
    const newReply = await Reply.create({questionid, username, answer, chapter, page, paragraph, like});
    res.status(200).json(newReply);
  } catch (error) {   
    res.status(400).json('Error:' + error);
  }
}

// GET all the replies from a single user
const getUserReplies = async(req, res) => {
  const { username } = req.params;

  const replies = await Reply.find({username: username}).sort({createdAt: -1})
  if(!replies){
    return res.status(404).json({error: 'No such reply'});
  }
  res.status(200).json(replies);
}

// POST the user like-click
const addUserLikeClick = async(req, res) => {
  const { replyId } = req.params;
  const { username } = req.body;

  try{
    const reply = await Reply.findById(replyId);
    if (!reply) {
      return res.status(404).json('Reply not found'); 
    }
    if (reply.like.includes(username)) {
      return res.status(400).json('User has already liked this reply');
    }
    reply.like.push(username); // Add the username to the like array
    await reply.save(); 

    res.json('Reply updated successfully');

  } catch (error) {
    res.status(400).json('Error:' + error);   
  }
}

// GET the liked replies data
const fetchLikedReplies = async(req, res) => { 
  try {
    const { id } = req.params;
    const { username } = req.query;

    const replies = await Reply.find({ questionid: id});
    const likedReplies = replies.filter((reply) => reply.like.includes(username));

    res.json(likedReplies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}



module.exports = {
    getReplies,
    createNewReply,
    getUserReplies,
    addUserLikeClick,
    fetchLikedReplies
};