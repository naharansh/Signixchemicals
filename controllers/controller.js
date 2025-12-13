const connections = require('../modules/userlogin.js')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generatesOTP = () => {
     const otp =  Math.floor(100000 + Math.random() * 900000).toString();
  return otp

}
exports.RegisterUser = async (req,res) => {
  try {
    const { username, password } = req.body
    const finduser = await connections.findOne({ username })
    
    if (finduser) {
      return res.status(404).json({
        message: 'user exisit'
      })
    }
    const result = await bycrypt.genSalt(10)
    
    const hashpassword = await bycrypt.hash(password, result)
    const createuser = await connections.create({ username, password: hashpassword})
    await createuser.save()
    res.status(200).json({
      message: 'user is created'
    })
  } catch (error) {
    res.status(200).json({
      message: 'failed to create user',
      error
    })
  }
}
const generateToken = async (user) => {
  user.last_login = Date.now()
    await user.save()
  return await jwt.sign({ id: user._id, password: user.pass, role: user.role }, process.env.SECREAT_KEY)
}

exports.UserLogin = async (req, res) => {
  try {
   
    const { username, password } = req.body
    if (!username && !password) {
      return res.status(404).json({
        message: 'username and password are empty '
      })
    }

    const user = await connections.findOne({ username: username })
  
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
    console.log(error)
  }
}

exports.VerfiyOTP = async (req, res) => {
  try {
    console.log("dfslhfd")
    const { username, otp } = req.body
    const user = await connections.findOne({ username })
    console.log(user)
    if (!user) {
      res.status(404).json({
        message: 'user does not found'
      })
    }
     if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.otp = undefined;
  user.otp_expiry = undefined;
   await user.save();
 const token = await generateToken(user)
    console.log(token)
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
exports.testing=async(req,res)=>{
  res.json({message:"hello"})
}