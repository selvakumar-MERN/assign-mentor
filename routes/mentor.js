const express=require('express')
const router= express.Router();
const mentorData= require('../cotrollers/mentor')

router.post('/addMentor',mentorData.addMentor);
module.exports=router;