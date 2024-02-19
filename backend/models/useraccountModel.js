const mongoose = require('mongoose');

const useraccountSchema = new mongoose.Schema({
    email:{type:String,required:true, unique:true},
    username:{type:String, required:true, unique:true},
    role:{
        type: String,
        enum: ["teacher", "student"],
        default: "student",
        required: true
    },
    district:{type:String, required:true},
    school:{type:String, required:true},
    score:{type: Number, default: 0},
    numOfQuestionsAsked:{type: Number, default: 0},
    numOfRepliesSent:{type: Number, default: 0},
    numOfLikesReceived:{type: Number, default: 0},
    numOfLikesGave:{type: Number, default: 0}
},{
    timestamps: true 
})

const Useraccount = mongoose.model('Useraccount', useraccountSchema);

module.exports = Useraccount;