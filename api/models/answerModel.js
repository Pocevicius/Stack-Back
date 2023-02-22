import mongoose from "mongoose";

const answerSchema=mongoose.Schema({
    answerContent:{type:String,required:true},
    dataCreated:{type:String},
    questionId:{type:String}
})
export default mongoose.model("Answer", answerSchema);
