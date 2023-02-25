const express = require ("express");
const router= express.Router()
// import auth from "../middleware/auth.js";
 
const {
    ASK_QUESTION,
    GET_ALL_QUESTIONS,
    DELETE_QUESTION_BY_ID,
    ADD_ANSWER,
    GET_ALL_QUESTIONS_BY_ID_WITH_ANSWERS,
    DELETE_ANSWER_BY_ID
}=require("../controllers/questions")

router.post("/question",ASK_QUESTION)

router.get("/allQuestions",GET_ALL_QUESTIONS)

router.delete("/question/:id",DELETE_QUESTION_BY_ID)

router.post("/answer/:id",ADD_ANSWER),

router.get("/allQuestionsWithAnswers/:id",GET_ALL_QUESTIONS_BY_ID_WITH_ANSWERS)

router.delete("/delAnswer/:id",DELETE_ANSWER_BY_ID)

module.exports= router