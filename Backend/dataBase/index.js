import mongoose from "mongoose";

export const dbConnect = async ()=>{
    try {
        await mongoose.connect(process.env.DATABASE_CONNECTION_STRING)
        console.log('DataBase Connected')
    } catch (error) {
     console.log(error)   
    }
}