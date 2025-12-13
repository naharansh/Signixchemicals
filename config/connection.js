const mongoose=require('mongoose')
const connections=async (req,res) => {
   try {
    mongoose.connect((process.env.URI)).then(()=>{
        console.log("database is connected")
    })
   } catch (error) {
    console.log(error)
   } 
}
module.exports=connections