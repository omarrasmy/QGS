const mongoose = require('mongoose')
const options = {discriminatorKey: 'kind'}


const QuestionSchema = new mongoose.Schema({
    Level:{
        type:String,
        required:true,
        trim:true
    },
    Question:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Instructor',
        required:true

    },time: Date,
    public:{
        type:Boolean,
        default:false,
        required:true
    },
    domain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Domain',
        
    }

},options)

QuestionSchema.methods.toJSON=function(){
    const Question=this
    const QuestionObject=Question.toObject()
    
  
    delete QuestionObject.__v
    // delete QuestionObject.kind
    // delete QuestionObject.time
    // delete QuestionObject.Level
    // delete QuestionObject.keyword
    // delete QuestionObject.distructors
    // delete QuestionObject.distructor
    // delete QuestionObject.state
    // delete QuestionObject.owner._id
    // delete QuestionObject.public
    
    return QuestionObject
}



const Question=mongoose.model('Question',QuestionSchema)
module.exports=Question







