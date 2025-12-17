const connections = require('../modules/userlogin.js')
// const roles=require('../')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generatesOTP = () => {
     const otp =  Math.floor(100000 + Math.random() * 900000).toString();
  return otp

}
const generateToken = async (user) => {
  user.last_login = Date.now()
    await user.save()
  return await jwt.sign({ id: user._id, password: user.pass, role: user.role }, process.env.SECREAT_KEY)
}

exports.RegisterUser = async (req,res) => {
  try {

    const {  password,email,name,phone,role_id,department } = req.body
    const finduser = await connections.findOne({ email })
   
    if (finduser) {
      return res.status(404).json({
        message: 'user exisit'
      })
    }
    
    const result = await bycrypt.genSalt(10)
    
    const hashpassword = await bycrypt.hash(password, result)
    const createuser = await connections.create({ email, password: hashpassword,name,phone,role_id,department})
    // await createuser.save()
    res.status(201).json({
      message: 'user is created',
      createuser
    })
  } catch (error) {
    res.status(505).json({
      message: 'failed to create user',
      error
    })
  }
}

exports.UserLogin = async (req, res) => {
  try {
   
    const { email, password } = req.body
    if (!email && !password) {
      return res.status(404).json({
        message: 'email and password are empty '
      })
    }

    const user = await connections.findOne({ email: email })
  
    if (!user) {
      return res.status(500).json({
        message: 'user not found'

      })
    }
    if (user.status !== 'active') {
      return res.status(500).json({
        message: 'user account is disabled'

      })
    }
    const comparePassword = await bycrypt.compare(password, user.password)
    if (!comparePassword) {
      return res.status(500).json({
        message: 'password is not matched'

      })
    }
     const otps =generatesOTP()
    user.otp = otps
    user.otp_expiry = Date.now() + 5 * 60 * 1000;
    await user.save();
    
    return res.status(200).json({
      message: 'Login successful',
      user
    })
  } catch (error) {
    res.status(505).json({
      message:'some error is occured',
      error:error.message
    })
  }
}

exports.VerfiyOTP = async (req, res) => {
  try {
   
    const { email, otp } = req.body
    const user = await connections.findOne({ email })
   
    if (!user) {
      res.status(404).json({
        message: 'user does not found'
      })
    }
    if (user.otp == undefined )
    {
      return res.status(404).json({
        message:'otp is required'
      })
    }
     if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.otp = undefined;
  user.otp_expiry = undefined;
   await user.save();
 const token = await generateToken(user)
  
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict"

    })
    res.status(200).json({
      message:"welcome to  the user"
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
exports.Getusers=async(req,res)=>{
  try {
    const result=await connections.find().populate('role_id').populate('department')
    if(result.length === 0)
    {
      return res.status(404).json({message:'users does not exists'})
    }
    res.status(200).json({message:'All users',result})
  } catch (error) {
    res.status(500).json({message:'some error occured',err:error.messsage})
  }
}
exports.Getuser=async(req,res)=>{
  try {
    const id=req.params.id;
    if(!id)
    {
      return res.status(404).json({message:'user does not exists'})
    }
    const result=await connections.findById(id).populate('role_id').populate('department')
    if(!result)
    {
      return res.status(404).json({message:'users does not exists'})
    }
    res.status(200).json({message:'user',result})
  } catch (error) {
    res.status(500).json({message:'some error occured',err:error.messsage})
  }
}
exports.Updateuser=async(req,res)=>{
  try {
    const id=req.params.id;
    if(!id)
    {
      return res.status(404).json({message:'user_id does not exists'})
    }
    const data=await connections.findById(id)
    if(!data)
    {
      return res.status(404).json({message:'users does not exists'})
    }
    const result=await connections.findByIdAndUpdate(id,req.body,{new:true,runValidators:true,context: "query"})
    if(!result)
    {
      return res.status(404).json({message:'data has not updated'})
    }
    res.status(200).json({message:'Updateduser',result})
  } catch (error) {
    res.status(500).json({message:'some error occured',err:error.messsage})
  }
}
exports.Deleteuser=async(req,res)=>{
  try {
    const id=req.params.id;
    if(!id)
    {
      return res.status(404).json({message:'user_id does not exists'})
    }
    const data=await connections.findById(id)
    if(!data)
    {
      return res.status(404).json({message:'users does not exists'})
    }
    const result=await connections.findByIdAndDelete(id)
    if(!result)
    {
      return res.status(404).json({message:'data has not deleted'})
    }
    res.status(200).json({message:'userdeleted'})
  } catch (error) {
    res.status(500).json({message:'some error occured',err:error.messsage})
  }
}
