const mongoose= require("mongoose"),
Schema=mongoose.Schema;
const studentSchema= new mongoose.Schema({
    studentId:{
          type:String,
          required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    previousMentor:{
        type: Schema.Types.ObjectId, 
        ref: 'mentor'
    },
    currentMentor:{
        type: Schema.Types.ObjectId, 
        ref: 'mentor'
    }
})
module.exports=mongoose.model('student',studentSchema)