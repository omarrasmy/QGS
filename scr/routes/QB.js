const express=require('express')
const QB=require('../models/QB')
const Auth=require('../middleware/Auth')

const router = new express.Router()

//add question to QB
router.post('/qb/add',Auth.Auth,async(req,res)=>{
    
    try{
        const qb=new QB({
            ...req.body,
            owner:req.instructor._id
        })
        await qb.save()
        res.status(201).send(qb)



    }catch(e){
        res.send(e)

    }
})




 module.exports=router
