const mongoose = require("mongoose");

const answerSchema=mongoose.Schema({
    answerContent:{type:String,required:true},
    dataCreated:{type:String},
    questionId:{type:String}
})
module.exports= mongoose.model("Answer", answerSchema);
