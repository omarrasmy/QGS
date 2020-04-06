const Request= require('../models/DomainRequests')


exports.Send_Domain_Request=async(req,res)=>{
    try{
        const request=new Request({
            ...req.body,
            requester:req.instructor._id
        })
        await request.save()
        const data= await Request.findOne({_id:request._id}).populate('requester',"Email")
        
        res.status(201).send(data)

    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }

}

exports.Vote_on_Request=async(req,res)=>{
    try{
        const requested_domain =await Request.findOne({_id:req.params.requested_domain_id}).populate({
            path:'requester',
            select:'Email'
        })
        if(!requested_domain){
            res.status(404).send('Not found')
        }
        requested_domain.votes++
        await requested_domain.save()

        res.send(requested_domain)


    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
}

exports.Show_domain_Requests=async(req,res)=>{
    try{
        const requests=await Request.find({}).populate({
            path:'requester',
            select:'Email'
        })
        if(requests.length===0){
            res.status(404).send('No requests')


        }
        res.status(200).send(requests)

    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
}

