const mongoose=require('mongoose')
const data=mongoose.Schema({
    username:{
        type:String,
        unique:true,

    },
    password:{
        type:String,
        unique:true,
    },
    email:{
        type:String,
        unique:true

    },
    status:
    {
        type:String,
        enum:['active','disabled'],
        default:'active'
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    last_login:{
        type:Date,
        default:undefined
    },
    otp:{
        type:String,
        default:undefined
    } ,
    otp_expiry :{
        type:Date,
        default:undefined
    }
})
module.exports=mongoose.model('login_table',data)