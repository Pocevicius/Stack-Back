const express = require("express");
const router=express.Router()
const auth=require ("../middleware/auth")

const{LOGIN,SIGN_UP}= require("../controllers/user")

router.post("/signUp",SIGN_UP)

router.post("/login",LOGIN)

module.exports=router