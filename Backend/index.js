import express from 'express'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv'
import { dbConnect } from './dataBase/index.js'
import { errorHandler } from './middelwares/errorHandler.js'
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config()
app.use(express.json())

dbConnect()


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use(errorHandler)
app.listen(process.env.PORT, () => {
  console.log(`Server Run On PORT : ${process.env.PORT}`)
})