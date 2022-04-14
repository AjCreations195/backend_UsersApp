const express = require('express')

const router = express.Router();
const User = require('../models/User')
var multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        console.log(file)
        var filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif'
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png'
        }
        if (file.mimetype === 'image/jpg') {
            filetype = 'jpg'
        }
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (err) {
        res.json({ message: err })
    }
})
//SUBMITS A POST
router.post('/', upload.single('file'), async (req, res) => {

    var user = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        manager: req.body.manager,
        company: req.body.company,
        gender: req.body.gender,
        file: 'http://localhost:3000/images/' + req.file.originalname

    });
    try {
        const savedUser = await user.save();
        res.json(savedUser)
    } catch (err) {
        res.json({ message: err })
    }


})

//SPECIFIC USER
router.get('/:userId', async (req, res) => {
    console.log(req.params.userId);
    try {
        const user = await User.findById(req.params.userId);
        res.json(user)
    }
    catch (err) {
        res.json({ message: err })
    }


})


//DELETE POST 
router.delete('/:userId', async (req, res) => {
    try {
        const deletedUser = await User.remove({ _id: req.params.userId })
        res.json(deletedUser)
    } catch (err) {
        res.json({ message: err })
    }
})

router.put('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.updateOne({ _id: req.params.userId },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    age: req.body.age,
                    manager: req.body.manager,
                    company: req.body.company,
                    gender: req.body.gender,
                }
            });
       c
    } catch (err) {
        res.json({ message: err })
    }
})

//Update a post 
router.put('/profile/:userId', upload.single('file'), async (req, res) => {
    try {
        const updatedUser = await User.updateOne({ _id: req.params.userId },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    age: req.body.age,
                    manager: req.body.manager,
                    company: req.body.company,
                    gender: req.body.gender,

                    file: 'http://localhost:3000/images/' + req.file.originalname
                }
            });
        res.json(updatedUser)
    } catch (err) {
        res.json({ message: err })
    }
})


module.exports = router;

