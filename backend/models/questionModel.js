const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    username:{type:String, required:true},
    question:{type:String, requried:true},
    chapter:{type:Number, requried:true},
    repliesId:[{type:String}]
},{ 
    timestamps: true 
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;