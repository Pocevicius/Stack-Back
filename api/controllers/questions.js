const questionSchema = require ("../models/questionModel")
const answerSchema = require ("../models/answerModel")
const ObjectId= require("mongoose").Types.ObjectId


module.exports.ASK_QUESTION= (req,res) =>{
    const question= new questionSchema({
    title: req.body.title,
    dateCreated: new Date(),
    answersIds: [],
    answered: false,
    });
    question
    .save()
    .then((result)=>{
        return res.status(200).json({
            statusMessage: "Question was posted",
            question: result,
          });
        })
        .catch((err) => {
          console.log("Error", err);
          res.status(404).json({ response: "something went wrong", error: err });
        });
    }

    module.exports.GET_ALL_QUESTIONS=async (req,res)=>{
        questionSchema.find()
        .then((result) => {
            return res.status(200).json(result);
          })
          .catch((err) => {
            console.log("err", err);
            res.status(404).json({ response: "Something went wrong" });
          });
    }
    module.exports.DELETE_QUESTION_BY_ID=async (req,res)=>{
        questionSchema.deleteOne({_id:req.params.id})
        .then(()=>{
            return res.status(200).json({
                statusMessage: "Question was deleted successfully",
              });
            })
            .catch((err) => {
              console.log("err", err);
              res.status(404).json({ response: "Something went wrong" });
            });
        }
        module.exports.ADD_ANSWER=async(req,res)=>{
            const answer= new answerSchema({
                answerContent:req.body.answerContent,
                dateCreated: new Date(),
                questionId: req.params.id
            })
            answer
            .save()
            .then((result)=>{
                answerSchema.updateOne({_id:result._id},{id: result._id}).exec()
                questionSchema.updateOne({_id:req.params.id},{answered:true,$push:{answersIds: result._id.toString()}}).exec()

                return res.status(200).json({
                    statusMessage: "Answer was added",
                    result: result,
                  });
                })
                .catch((err) => {
                  console.log("Error occurred", err);
                  res.status(404).json({ response: "Error try again" });
                });
   
            }
            module.exports.GET_ALL_QUESTIONS_BY_ID_WITH_ANSWERS= async (req,res)=>{
                const data=await questionSchema.aggregate([
                    { $lookup: {
                        from: "answers",
                        localField: "answersIds",
                        foreignField: "_id",
                        as: "questionAnswers",
                      },
                    },
                    { $match: { _id: ObjectId(req.params.id) } },
                  ]).exec();
                  
                  return res.status(200).json({ data });
                }

            module.exports.DELETE_ANSWER_BY_ID= async(req,res)=>{
                
                questionSchema.findOneAndDelete({answersIds: req.params.id})
                
                    return res.status(200).json({
                        statusMessage: "Answer was deleted successfully"
                      });
                    }
                