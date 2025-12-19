const modules=require('../modules/product.js')
const categories=require('../modules/categories.js')
exports.CreateProduct=async (req,res) => {
    try {
      
        const{category_id,product_name,price,gst,stock}=req.body

        if(!category_id||!product_name||!price||!gst||!stock)
        {
            return res.status(404).json({message:'fields are requried'})
        }
        const result=await categories.findById(category_id)
        if(!result)
        {
            return res.status(404).json({message:'category does not exist '})
        }
        const data= await modules.create({category_id,product_name,price,gst,stock})
        res.status(200).json({message:'the product is created',data})

    } catch (error) {
        res.status(500).json({message:'some error is occured',err:error.message})
    }
}
exports.GetProducts=async (req,res) => {
    try {
      const result=await modules.find().populate('category_id')
      if(result.length === 0)
      {
        return res.status(404).json({message:'products does not exist'})
      }
      res.status(200).json({message:'all products are',result})

    } catch (error) {
        res.status(500).json({message:'some error is occured',err:error.message})
    }
}
exports.GetProduct=async (req,res) => {
    try {
        const {id}=req.params;
        if (!id) {
            return res.status(404).json({id:'id does not exist in the database'})
        }
      const result=await modules.findById(id).populate('category_id')
      if (!result) {
       return res.status(404).json({message:'products does not exist'})
      }
      res.status(200).json({message:'the product is ',result})

    } catch (error) {
        res.status(500).json({message:'some error is occured',err:error.message})
    }
}
exports.UpdateProduct=async (req,res) => {
    try {
        const {id}=req.params;
        if (!id) {
            return res.status(404).json({id:'id does not exist in the database'})
        }
      const result=await modules.findById(id)
      if (!id) {
       return res.status(404).json({message:'products does not exist'})
      }
      const data=await modules.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        context:'query'
      })
      if(!data)
      {
        return res.status(404).json({message:'data cannot be updated'})
      }
      res.status(200).json({message:'the updated product is ',data})

    } catch (error) {
        res.status(500).json({message:'some error is occured',err:error.message})
    }
}
exports.DeleteProduct=async (req,res) => {
    try {
        const {id}=req.params;
        if (!id) {
            return res.status(404).json({id:'id does not exist in the database'})
        }
      const result=await modules.findById(id)
      if (!id) {
       return res.status(404).json({message:'products does not exist'})
      }
      const data=await modules.findByIdAndDelete(id)
      if(!data)
      {
          return res.status(404).json({message:'products cannot be updated'})
      }
      res.status(200).json({message:'the product is deleted '})

    } catch (error) {
        res.status(500).json({message:'some error is occured',err:error.message})
    }
}