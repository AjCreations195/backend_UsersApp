const express = require('express')
const router = express.Router();
const User = require('../models/User')
var multer = require('multer');
const fs = require('fs');
const csvToJson = require('csvtojson');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/files');
    },
    filename: (req, file, cb) => {
        console.log(file)

        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('csvFile'), async (req, res) => {
    try{
        const fileRows = [];
        csvToJson().fromFile('./public/files/addresses.csv')
            .then(users => {
                for (let i in users) {
                    fileRows.push(users[i])
                }
             usersFile =   User.insertMany(fileRows)
            } )
           res.json(usersFile)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;