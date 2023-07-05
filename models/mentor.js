const mongoose= require("mongoose")
const mentorSchema= new mongoose.Schema({
    mentorId:{
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
})
module.exports=mongoose.model('mentor',mentorSchema)