// const mongoose = require('mongoose');

// const MCQSchema =new mongoose.Schema({
//     question: { type: String, required: true },
//     answer: { type: String, required: true },
//     distructors:[{
//         distructor:{
//             type:String,
//             required:true
            
//         }
//     }],
// });

// const CompleteSchema =new mongoose.Schema({
//     question: { type: String, },
//     answer: { type: String, },
    
// });

// const TrueOrFalseSchema =new mongoose.Schema({
//     question: { type: String, },
//     state: { type: String, },
    
// });


// const QuestionBankSchema = new mongoose.Schema({
//     TypeOfQuestion: { type: String },
//     owner:{type:mongoose.Schema.Types.ObjectId,ref:'Instructor'},

//     "MCQ": {
//         type: [ MCQSchema ],
//         default: [{
//             question: '',
//             answer: '',
//             TypeOfQuestion:'',
//             distructors:[{}] ,
//             owner:{}

//         }]
//     },
//     "Complete": {
//         type: [ CompleteSchema ],
//         default: [{
//             question: '',
//             answer: '',
//             owner:{}

//         }]
//     },"TrueOrFalse": {
//         type: [ TrueOrFalseSchema ],
//         default: [{
//             question: '',
//             state: '',
//             owner:{}

//         }]
//     },
// });



// const QB = mongoose.model('QB', QuestionBankSchema);
// module.exports=QB


