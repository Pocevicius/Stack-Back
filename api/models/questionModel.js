import mongoose from "mongoose";

const questionSchema=mongoose.Schema({
    title:{type:String,required: true},
    dataCreated:{type:String},
    answersIds:{type:Array},
    answered:{type:Boolean}
}
)
export default mongoose.model("Question",questionSchema);
