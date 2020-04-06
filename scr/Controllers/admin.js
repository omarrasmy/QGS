const Admin = require('../models/AdminAccount')
const Instructor=require('../models/instructorAccount')
const {SendWelcomMessage,CancelationMail,Send_Rejection_mail}=require('../mails/sendMails')



exports.SingUp=async(req,res)=>{
    try{
        const isAdmin = await Admin.findOne({})
        console.log(isAdmin)
        if(isAdmin!==null){
            return res.status(400).send('cannot create new admin')
        }
        const admin= new Admin(req.body)
        const token=await admin.GenerateTokens()
        await admin.save()
        res.status(201).send({admin,token}) 
    }catch(e){
        res.status(400).send(e)
     }
}

exports.DeleteInstructorAccount=async(req,res)=>{
    try{
        const instructor= await Instructor.findOne({_id:req.params.id})
        if(! instructor){
           return res.status(404).send('no such an instructor')
        }
        instructor.remove()
        res.send('successfully removed')

    }catch(e){
        res.send(e)
    }

}
exports.Login=async(req,res)=>{
    try{
        const admin = await Admin.findByEmailAndPass(req.body.email,req.body.password)
        const token= await admin.GenerateTokens()
        res.send({admin,token})
    }catch(e){
        res.send(e)
    }
}
exports.LogOut=async(req,res)=>{
    try{
        req.admin.tokens=req.admin.tokens.filter((t)=>{
           return t.token!==req.token
        })
        await req.admin.save()
        res.status(200).send('Logged Out successfully')

    }catch(e){
        res.status(403).send(e)

    }

}

exports.LogOutFromAllDevices=async(req,res)=>{
    try{
        req.admin.tokens=[]
        await req.admin.save()
        res.status(200).send('Logged out from all devicess successfully')

    }catch(e){
        res.send(403).send(e)

    }
}

exports.editAdminProfile=async(req,res)=>
{
    const allowed=['email','password']
    const updates=Object.keys(req.body)
    const IsValidUpdate=updates.every((update)=>allowed.includes(update))
    if(!IsValidUpdate){
        res.status(400).send({error:'Not exisited properity'})
    }try{
        updates.forEach((update)=> req.admin[update]=req.body[update])
         await req.admin.save()
         const admin=req.admin
         res.send(admin)

    }catch(e){
        res.status(400).send(e)

    }
}  
exports.List_signUp_Requests=async(req,res)=>{
    try{
        const instructors= await Instructor.find({accepted:'false'})
        if(instructors.length===0){
           return res.status(404).send('No requests')
        }
        res.status(200).send(instructors)

    }catch(e){
        res.status(500).send(e)
    }

}
const Select_Request = async(id)=>{
    const instructor= await Instructor.findOne({_id:id,accepted:false })
        if(!instructor){
            throw new Error('not found ,,')

        }
        return instructor

}
exports.Select_SingUp_Request=async(req,res)=>{
    try{
        const instructor= await Select_Request(req.params.id)
    
        res.status(200).send(instructor)


    }catch(Error){
        console.log(Error)
        res.status(404).send(Error)

    }
}


 exports.Add_instructor=async(req,res)=>{
     try{
         
        const admin = await Admin.findOne({})
        const instructor= await Select_Request(req.params.id)
        if(instructor.accepted===false){
        SendWelcomMessage(admin.email,instructor.Email,instructor.Frist_Name)
        instructor.accepted='true'
        instructor.save()
        return res.status(201).send({instructor})
        }
        res.status(400).send('already added')


     }catch(e){
        console.log(e)
        res.status(500).send(e)

     }


 }
exports.Reject_instructor_request=async(req,res)=>{
    try{
        const admin = await Admin.findOne({})
        const instructor= await Select_Request(req.params.id)
        
        
            await instructor.remove()
            Send_Rejection_mail(admin.email,instructor.Email)

            res.send('rejection mail is sent')
            
        


    }catch(e){
        console.log(e)
        res.status(500).send(e)


    }
}