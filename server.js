const express = require('express')
const path = require('path');
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config()
const { connectDB } = require('./Repository/Connect_MongoDB')
const cors = require('cors')

const UserRouter = require('./Controller/UserController')
const PatientRouter = require('./Controller/PatientController')
const QuestionRouter = require('./Controller/QuestionController')
const AnalysisRouter = require('./Controller/AnalysisController')

const app = express()
// Increase the request size limit
app.use(bodyParser.json({ limit: "50mb" })); // Adjust as needed
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 3000

connectDB()

app.get('/', (req, res) => {
  res.send('This is Vamana Backend! ')
})

app.get('/privacy-policy', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/privacy.html'));
});


app.use('/api/user', UserRouter)
app.use('/api/patient', PatientRouter)
app.use('/api/questions', QuestionRouter)
app.use('/api/analysis', AnalysisRouter)

app.get("/api/test", (req, res) => {
    res.json({message : "Connection Successful" , executed : true});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})