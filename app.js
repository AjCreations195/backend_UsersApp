const express = require('express');
const app = express()
const mongoose = require('mongoose');
const path = require('path'); 
const bodyParser = require('body-parser')
const cors = require('cors')
//import routes 
const usersRoute = require('./routes/users')
const filesRoute = require('./routes/files')
require('dotenv/config')

//Middlewares
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors())
app.use('/users', usersRoute)
app.use('/files',filesRoute)
app.use('/images', express.static(path.join('public/images')))

//connect to db
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true },
    () => {
        console.log('Connected to DB!');
    })

//How to we start listening  to the server
app.listen(3000);