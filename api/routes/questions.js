const express = require ("express");
const router= express.Router()
const auth=require ("../middleware/auth")
 
const {
    ASK_QUESTION,
    GET_ALL_QUESTIONS,
    DELETE_QUESTION_BY_ID,
    ADD_ANSWER,
    GET_ALL_QUESTIONS_BY_ID_WITH_ANSWERS,
    DELETE_ANSWER_BY_ID,
    FILTER_QUESTIONS
}=require("../controllers/questions")

router.post("/question",auth,ASK_QUESTION)

router.get("/allQuestions",GET_ALL_QUESTIONS)

router.get("/filter",FILTER_QUESTIONS)

router.delete("/question/:id",auth,DELETE_QUESTION_BY_ID)

router.post("/answer/:id",auth,ADD_ANSWER),

router.get("/allQuestionsWithAnswers/:id",GET_ALL_QUESTIONS_BY_ID_WITH_ANSWERS)

router.delete("/delAnswer/:id",auth,DELETE_ANSWER_BY_ID)

module.exports= router