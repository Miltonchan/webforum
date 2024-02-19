const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser')

// express app
const app = express();

// Import mongoose models and schemas
const Useraccount = require('./models/useraccountModel');
const Adminaccount = require('./models/adminaccountModel');
const Question = require('./models/questionModel');
const Reply = require('./models/replyModel');

//Routers 
const useraccountRouter = require('./routes/useraccount');
const adminaccountRouter = require('./routes/adminaccount');
const questionRouter = require('./routes/question');
const replyRouter = require('./routes/reply');

// middleware
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})
const path = require("path");
app.use(express.static(path.join(__dirname, "build"))); // put this line of code in app.js

// routes
app.use('/useraccount',useraccountRouter);
app.use('/adminaccount',adminaccountRouter);
app.use('/question',questionRouter);
app.use('/reply',replyRouter);


// connect to db
mongoose.connect(process.env.MONG_URL)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, ()=>{
      console.log('connected to db & listening on port', process.env.PORT);
      // Create Sample Dataset for testing  *uncomment it for the first time
      // generateSampleData();
    })   
  })
  .catch((error) => {
      console.log(error);
  })

// Create the Sample Data
const generateSampleData = async () => {
  try{
    const users = [
      // {email:'Tom@gmail.com', username:'Tom1949', role:'teacher', district:'Sha Tin', school:'CCC'},
      // {email:'Mary@gmail.com', username:'Mary21', role:'student', district:'Sha Tin', school:'CCC'},
      // {email:'John@gmail.com', username:'Li', role:'teacher', district:'Sha Tin', school:'CCC'}
    ]

    const admins = [
      // {adminid:1, adminname:'AI4future1', password:'ai123'},
      // {adminid:2, adminname:'AI4future2', password:'ai321'},
      // {adminid:53, adminname:'AI4future3', password:'ai43'}
    ]

    const questions = [
      // {username:'Tom1949', question:'What is machine Learning?', chapter:2},
      // {username:'Li', question:'How to do face recogintion?', chapter:3},
      // {username:'Mary21', question:'Does self-driving include AI?', chapter:7},
    ]

    const replies = [
      // {questionid:'',username:'Tom1949', answer:'I dont know too', chapter:3, page:23, paragraph:3, like:['Li']},
      // {questionid:'',username:'Li', answer:'refer to textbook...', chapter:2, page:12, paragraph:2, like:['Tom1949']},
      // {questionid:'',username:'Mary21', answer:'Using CV', chapter:3, page:34, paragraph:4, like:['Mary21']},
      // {questionid:'',username:'Tom1949', answer:'Yes', chapter:7, page:78, paragraph:1, like:['Tom1949']},
      // {questionid:'',username:'Li', answer:'No', chapter:7, page:89, paragraph:3, like:['Li']}
    ]


    const createdUsers = await Useraccount.insertMany(users);
    const createdAdmins = await Adminaccount.insertMany(admins);
    const createdQuestions = await Question.insertMany(questions);
    const createdReplies = await Reply.insertMany(replies);

    console.log('Sample Data is created in QADatabase.')
  } catch (error) {
    console.log(error)
  }
}
