


const myModel = require('../model/userModel')
const bcrypt = require('bcrypt-inzi')
const jwt = require('../jwtmiddleware/jwtmiddleware')
exports.createUser = async(req,res)=>{
    try{
        const {name,email,password }=req.body
        const existing = await myModel.findOne({email})
        //check if user is existing already
        if(existing){
            return res.status(400).json({messege:"user already registered"})

        }
        //make sure recieved all feilds
        if(!name || !email || !password)
        {
            return res.status(400).json({messege:"all feilds required"})
        }
        //hash password

        const hashpswd = await bcrypt.stringToHash(password,10)
        //create user
        const user = await new myModel({
            name,
            email,
            password:hashpswd
        })
        await user.save()
        const token = jwt.sign(req.body)
        return res.status(200).json(token)
        // return res.status(200).json(token)

    }
    catch(error){
        // console.log(error)
        return res.status(500).json({messege:"internal server error",error:error.messege})
    }
}

exports.login = async (req, res)=>{

    try{
        const{email,password}= req.body;
        //find user if available
        const user = await myModel.findOne({email})
        //veriifyhash

        const verifyHash = await bcrypt.varifyHash(password,user.password)

        if(!verifyHash){
        return res.status(400).json({messege:"wrong password"})

    }

    return res.status(200).json(user)
}

    catch(error){
        return res.status(500).json({messege:"internel server error", error:error.meessege})
    }
    
}

exports.getUser = async(req,res) =>{

    try{
        const allusers = await myModel.find()
        return res.status(200).json(allusers)
    }

    catch(error){
        return res.status(500).json({messege:"internel server error", error:error.meessege})
    }
    
}