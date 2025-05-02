import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user
const loginUser = async(requestAnimationFrame,res) =>{

    const {email,password} = requestAnimationFrame.body;
    try {
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({success:false,message:"user does not exit"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false,message:"Invalid credientials"});
        }
        const token = createToken(user._id);
        res.json({success:true,message:"logged in",token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }

}

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (requestAnimationFrame, res) => {
    const {name,password,email} = requestAnimationFrame.body;
    try {
        //check user is already exist
        const exist = await userModel.findOne({email});
        if(exist) {
            return res.json({success:false,message:"User already exists"});
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please entered valid email"});
        }

        if(password.length<8){
            return res.json({success:false,message:"password should be at least 8 character"});
        }

        //hashing user password
        const salt =await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})


    } 
    catch (error) {
         console.log(error);
         res.json({success:false,message:"Error"})
    }    
}

export {loginUser,registerUser}