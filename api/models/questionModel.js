const mongoose = require("mongoose");

const questionSchema=mongoose.Schema({
    title:{type:String,required: true},
    dataCreated:{type:Date},
    answersIds:{type:Array},
    answered:{type:Boolean}
}
)
module.exports= mongoose.model("Question",questionSchema);
