const mongoose= require('mongoose')

const DistructorSchema = new mongoose.Schema({
    distructor:{
        type:String,
        required:true,
        trim:true
    },
    Question_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'

    }
})

const Distructor=mongoose.model('Distructor',DistructorSchema)
module.exports=Distructor