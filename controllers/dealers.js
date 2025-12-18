const dealers=require('../modules/dealers.js')
exports.CreateDealer=async (req,res) => {
  try {
    const {dealer_name,contact_person,phone,email,address}=req.body
    if(!dealer_name||!contact_person||!phone||!email||!address)
    {
        return res.status(404).json({message:'fields does not exist'})
    }
    const user=await dealers.findOne({dealer_name})
    if(user)
    {
        return  res.status(404).json({message:'dealer  exist'})
    }
    const result=await dealers.create({dealer_name,contact_person,phone,email,address})
    res.status(200).json({message:'dealer is created',result})
  } catch (error) {
     res.status(404).json({message:'some error is occured',err:error.message})
  }  
}
exports.GetDealers=async (req,res) => {
    try {
        const result=await dealers.find()
        if(result.length === 0)
        {
            return res.status(404).json({message:'dealers does not exist'})
        }
        res.status(200).json({message:'list of dealers',result})
    } catch (error) {
         return res.status(500).json({message:'some error exist',err:error.message})
    }
}
exports.GetDealer=async (req,res) => {
    try {
        const {id}=req.params
        if(!id)
        {
            return res.status(404).json({message:'id does not exist in theroute'})
        }
        const dealer=await dealers.findById(id)
        if(!dealer)
        {
            return res.status(404).json({message:'dealer does not exist'})
        }
          res.status(200).json({message:'dealer is',dealer})
    } catch (error) {
         return res.status(500).json({message:'some error exist',err:error.message})
    }
}
exports.UpdateDealers=async (req,res) => {
    try {
        const {id }=req.params
        if(!id)
        {
            return res.status(404).json({message:'id does not exist in theroute'})
        }
        const dealer=await dealers.findById(id)
        if(!dealer)
        {
               return res.status(404).json({message:'dealer does not exist'})
        }
        const result=await dealers.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true,
            context:"query"
        })
        if(!result)
        {
            return res.status(404).json({message:'dealer cannot be updated'})
        }
        res.status(200).json({message:'dealer is updated',result})
    } catch (error) {
        res.status(200).json({message:'some error is occured',err:error.message})
    }
}
exports.DeleteDealers=async (req,res) => {
    try {
        const {id }=req.params
        if(!id)
        {
            return res.status(404).json({message:'id does not exist in the route'})
        }
        const dealer=await dealers.findById(id)
        if(!dealer)
        {
               return res.status(404).json({message:'dealer does not exist'})
        }
        const result=await dealers.findByIdAndDelete(id)
        if(!result)
        {
            return res.status(404).json({message:'dealer cannot be deleted'})
        }
        res.status(200).json({message:'dealer is deleted'})
    } catch (error) {
        res.status(200).json({message:'some error is occured',err:error.message})
    }
}