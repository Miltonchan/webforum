let Question = require('../models/questionModel');
const mongoose = require('mongoose');

// GET all Questions
const getQuestions = async(req, res) => {
  const questions = await Question.find({}).sort({createdAt: -1});
  res.status(200).json(questions);
}

// GET a single question
const getQuestion = async(req, res) => {
  const { id } = req.params;

  const question = await Question.findOne({_id : id});

  if(!question){
    return res.status(404).json({error: 'No such question'});
  }

  res.status(200).json(question);
}

// CREATE a new question
const createNewQuestion = async(req, res) => {
  const{ username, question, chapter } = req.body;

  try{
    const newQuestion = await Question.create({username, question, chapter})
    res.status(200).json(newQuestion);
  } catch (error) {   
    res.status(400).json('Error:' + error);
  }
}

// DELETE a question
const deleteQuestion = async(req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findOneAndDelete({_id: id});
    res.status(200).json(question)
  } catch (error) {
    res.status(400).json({error: 'No such question'})
  }
}

// Update the question reply Id 
const updateQuestionReplyId = async(req, res) => {
  const { id } = req.params;
  const { repliesId } = req.body;

  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    question.repliesId.push(repliesId);

    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } catch {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  getQuestions,
  getQuestion,
  createNewQuestion,
  deleteQuestion,
  updateQuestionReplyId
};

  // const handleDeleteClick = async(question, event) => {
  //   event.stopPropagation()
  //   const response = await fetch(`http://localhost:4000/question/${question._id}`, {
  //     method: 'DELETE'
  //   });
  //   const data = await response.json();

  //   if(response.ok){
  //     dispatch({type: 'DELETE_QUESTION', payload: data});    
  //     fetchQuestions();
  //   }    
  // }