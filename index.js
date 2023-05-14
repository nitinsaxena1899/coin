import express from 'express'
import authRoutes from './routes/authRoutes.js'
import dotenv from 'dotenv'
import { dbConnect } from './dataBase/index.js'
import mongoose from 'mongoose'
import {errorHandler} from './middelwares/errorHandler.js'

const app = express()
dotenv.config()
app.use(express.json())

dbConnect()
// const dbConnectt = async ()=>{
//     try {
//         await mongoose.connect(process.env.DATABASE_CONNECTION_STRING)
//         console.log('DataBase Connected')
//     } catch (error) {
//         console.log(error)   
//     }
// }
// dbConnectt()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/auth',authRoutes)
app.use(errorHandler)
app.listen(process.env.PORT, () => {
  console.log(`Server Run On PORT : ${process.env.PORT}`)
})