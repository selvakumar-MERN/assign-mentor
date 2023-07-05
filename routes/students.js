const express=require('express')
const router= express.Router();
const studentData= require('../cotrollers/students')

router.post('/assign/allstudents',studentData.multipleAssign)
router.post('/addStudent',studentData.addStudent);
router.post('/assignMentor',studentData.assignMentor)
router.post('/previousMentor/:id',studentData.findpreMentor)
router.post('/mentor/getstudents/:id',studentData.getStudents)
module.exports=router;