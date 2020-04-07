const mongoose = require('mongoose')
const validator = require('validator')
const uniqueValidator = require('mongoose-unique-validator')
const validateInteger = require('mongoose-integer')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');

const InstructorSchema =new mongoose.Schema(
    {
        Email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true
        }, 
        Password:{
            type:String,
            required:true,
            trim:true,
            minlength:6,
            validate(value){
                if(validator.contains(value.toLowerCase(),'password')){
                    throw new Error('PASSWORD MUST NOT HAS password STRING!')
                }
            }
        },
        // personal_ID:{
        //     type:Buffer
           
        //     },
            pic:{
                type:Buffer
            },
            Age:{
                type:Number,
                default:23,
                validate(value){
                    if(value<23){
                        throw new Error('Age must be 23 or above!')
                    }
                }
    
            },
            Frist_Name:{
                type:String,
                trim:true,
                required:true
            }, Last_Name:{
                type:String,
                trim:true,
                required:true
            },
            Address:{
                type:String,
                trim:true,
            },
            accepted:{
                type:Boolean,
                default:false
            },
            
            tokens:[{
                token:{
                    type:String,
                    required:true
                }
            }]

})
InstructorSchema.plugin(uniqueValidator)
InstructorSchema.plugin(validateInteger)

InstructorSchema.virtual('Exams',
{
    ref:'Exam',
    localField:'_id',
    foreignField:'owner'
    
}
)
InstructorSchema.methods.toJSON= function(){
    const instructor = this   
    const instructorObject = instructor.toObject()
    delete instructorObject.Password
    return instructorObject
}
InstructorSchema.methods.GenerateTokens= async function(){
    const instructor=this
     const token= await jwt.sign({_id: instructor._id.toString()},process.env.JWTSEC)
     instructor.tokens=instructor.tokens.concat({token})
     await instructor.save()
     return token
}
InstructorSchema.statics.findByCredentials=async (Email,Password)=>{
    
    const instructor= await Instructor.findOne({Email})
    if(!instructor){
        throw new Error({error:'unable to login'})}
    const isMatch=await bcrypt.compare(Password,instructor.Password)
    if(!isMatch){
        throw new Error({error:'unable to login'})
    }
    return instructor
}

// Hashing password before saving it into database

InstructorSchema.pre('save',async function(next){
    const instructor=this
    if(instructor.isModified('Password')){
        instructor.Password=await bcrypt.hash(instructor.Password,8)
    }
    next()
})

const Instructor = mongoose.model('Instructor',InstructorSchema)
module.exports=Instructor