const express = require('express')
const dotenv = require('dotenv').config()
const { connectDB } = require('./Repository/Connect_MongoDB')
const cors = require('cors')

const UserRouter = require('./Controller/UserController')
const PatientRouter = require('./Controller/PatientController')
const QuestionRouter = require('./Controller/QuestionController')

const app = express()

app.use(express.json())
app.use(cors())
const port = process.env.PORT || 3000

connectDB()

app.get('/', (req, res) => {
  res.send('This is Vamana Backend! ')
})

app.use('/api/user', UserRouter)
app.use('/api/patient', PatientRouter)
app.use('/api/questions', QuestionRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})