import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://greatstack:72193824691@cluster0.co6cy.mongodb.net/familyfare').then(()=>{
        console.log("DB connected");
    })
}