const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
const mongoose = require('mongoose')
require('dotenv/config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Middleware to set the default timezone for the Express application
app.use((req, res, next) => {
  process.env.TZ = 'Europe/Vienna'; // Set the default timezone to Vienna
  next();
});


const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use('/', router)

const port = process.env.PORT || 5500

mongoose.set("strictQuery", false)
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('Connected to the database')
    app.listen(port, () => {
      console.log("Server is listenning port 4000");
    }
    )
  }
  ).catch((error) => {
    console.log("Can't connect to database. " + error);
  }
  )
