const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    questionid:{type:String, required:true},
    username:{type:String, required:true},
    answer:{type:String, required:true},
    chapter:{type:Number, required:true},
    page:{type:Number, requried: true},
    paragraph:{type:Number, required: true},
    like:[{type:String}]
},{ 
    timestamps: true 
})

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;