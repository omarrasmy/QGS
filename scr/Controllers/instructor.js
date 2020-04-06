const Instructor = require('../models/instructorAccount')
const {SendWelcomMessage,CancelationMail}=require('../mails/sendMails')
const Admin=require('../models/AdminAccount')
const multer=require('multer')



exports.Login=async(req,res)=>{

    try{
      const instructor=await Instructor.findByCredentials(req.body.Email,req.body.Password)
    
      if(instructor.accepted===true){
      const token = await instructor.GenerateTokens()
      return res.send({instructor,token})
      }
      res.send('wait untill receving gmail confrimation mail')
    }catch(e){
        res.status(400).send(e)
    }

}

exports.Logout=async(req,res)=>{
    try{
        req.instructor.tokens=req.instructor.tokens.filter((t)=>{
         return  t.token!==req.token

        })
        await req.instructor.save()
        res.send('logged out')

    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
}

exports.ReadProfile=async(req,res)=>{
    res.send(req.instructor)
 }

 exports.logoutFromAllDevices=async(req,res)=>{
     try{
         req.instructor.tokens=[]
         await req.instructor.save()
         res.status(200).send('Logged out from all devicess successfully')

     }catch(e){
        res.send(403).send(e)

     }
 }

 exports.deleteAccount=async(req,res)=>{
    try{
        const instructor=req.instructor
        await instructor.remove()
        CancelationMail(instructor.Email,instructor.Frist_Name)
        res.send('successfully removed')

    }catch(e){
        res.send(e)
    }

}

exports.image= multer({
    
    limits:{
        fieldSize:1000000

    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|npg|jpeg)/)){
            return cb('please provide an image!')

        }
        cb(undefined,true)
    }

})

exports.UploadProfilePicture=async(req,res)=>{
    req.instructor.pic=req.file.buffer
    await req.instructor.save()
    res.send('image uploaded successfuly')
}
exports.fetcProfilePicture=async (req,res)=>{
    try{
    const instructor= await Instructor.findById(req.params.id)
    if(!instructor || !instructor.pic){
        throw new Error()
    }
    res.set('Content-Type','image/jpg')
    res.send(instructor.pic)}
    catch(e){
        res.status(404).send()
    }
}
//upload resources
exports.resource=multer({
    dest:'Resources',
    limits:{
        fieldSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(doc|docx|pdf)/)){
            return cb(new Error('please upload a PDF or word File!'))
        }
        cb(undefined,true)
    }
})
exports.enterResources=async(req,res)=>{
    
    res.send('file uploaded')
}
exports.Send_SingnUp_Request= async(req,res)=>{
    try{
        const instructor= new Instructor(req.body)
        await instructor.save()
        res.status(200).send('your request is sent .. please check your response mail')
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }

}
