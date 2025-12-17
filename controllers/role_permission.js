const permissions=require('../modules/rolePermission.js')
const permission=require('../modules/permissions.js')
const roles=require('../modules/roles.js')
exports.CretePermission=async (req,res) => {
        try {
            const {role_id,permission_id}=req.body
            if(!role_id || !permission_id)
            {
                return res.status(404).json({message:'role_id or permission_id are empty'})
            }
            const ids=await permission.findById(permission_id)
            const roleid=await roles.findById(role_id)
            if(!role_id && !ids)
            {
                res.status(404).json({message:'fields are not exist'})
            }
            const result=await permissions.create({role_id,permission_id})
            console.log(result)
            res.status(200).json({
                result
            })

        } catch (error) {
            if(error.code === 11000)
                {
                    return res.status(409).json({ error: "Permission already assigned to this role"})
                }  
        }
}
exports.GetAllRolePermission=async(req,res)=>{
    try {
        const result=await permissions.find().populate('role_id').populate('permission_id')
        if(result.length === 0)
        {
            return res.status(404).json({message:'permissions are does not exists'})
        }
        res.status(200).json({message:'list of role permission',result})
    } catch (error) {
        return res.status(404).json({message:'some error is occured',err:error.message})
    }
}
exports.GetPermission=async (req,res) => {
    try {
        const id=req.params.id
        if(!id)
        {
            return res.status(404).json({message:'id does not found'})
        }
        const result=await permissions.findById(id).populate('role_id').populate('permission_id')
        if(!result)
        {
            return res.status(404).json({message:'permisssion is not found'})
        }
        res.status(200).json({
            message:'specific permission',
            result
        })
    } catch (error) {
            res.status(500).json({
                message:'some error is required',
                err:error.message
        })       
    }
}
exports.UpdatePermission=async (req,res) => {
    try {
        const id=req.params.id
        if(!id)
        {
            return res.status(404).json({message:'id does not exists'})
        }
        const result=await permissions.findById(id)
        if(!result)
        {
            return res.status(404).json({message:'permission does not exist'})
        }
        const data=await permissions.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators: true,    
            context: "query"
        })
        if(!data)
        {
             return res.status(404).json({message:'permission cannot be updated'})
        }
        res.status(200).json({
            message:'updated permission',
            data
        })
    } catch (error) {
          res.status(500).json({
            message:'some error occured',
            err:error.message
        })    
    }    
}
exports.DeletePermission=async (req,res) => {
    try {
        const id=req.params.id
        if(!id)
        {
            res.status(404).json({message:'id does not exist'})
        }
        const result=await permissions.findById(id)
        if(!result)
        {
            res.status(404).json({message:'user does not exist'})
        }
        const deleteduser=await permissions.findByIdAndDelete(id)
        if(!deleteduser)
        {
             res.status(404).json({message:'permissionsand roles are not deleted'})
        }
        res.status(200).json({message:'permissionandrole are deleted'})
    } catch (error) {
        res.status(500).json({
            message:'some error is occured',
            err:error.message
        })
    }
}