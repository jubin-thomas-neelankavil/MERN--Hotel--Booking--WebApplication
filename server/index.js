const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Place = require('./models/Place');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const imageDownloader = require('image-downloader')
const multer = require('multer');
const fs = require('fs')
const path = require('path');


const app = express();



const salt = bcrypt.genSaltSync(10);
const jwtSecretKey = 'djcnwhbwdmvouhoc488vwvw154v3'


dotenv.config();

app.use(cors({
    credentials: true,
    origin:'http://localhost:5173'
}));

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'))



mongoose.connect(process.env.DB_MONGO_URI)


app.post("/register", async (req, res) => {

try {
    const bcryptPassword = req.body.password;
   
    const hashpassword = bcrypt.hashSync(bcryptPassword, salt);

    const data = {
        name: req.body.name,
        email: req.body.email,
        password: hashpassword
    }
    const datasave = await User(data);
    datasave.save()

    res.json(datasave);

} catch (error) {
    console.error('Error in registration:', error);
    res.status(500).send('Internal Server Error'); 
}

})


app.post('/login',async (req, res) => {
    
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    console.log(userDoc);

    if (userDoc) {

const passok = bcrypt.compareSync(password , userDoc.password)
        if (passok) {

            jwt.sign({
                email: userDoc.email,
                id: userDoc._id,
              
            }, jwtSecretKey, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc)

            });

        } else {
            res.status(422).json('password not ok')
}
    } else {
        res.json('not found')
    }

})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecretKey, async (err, user) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(user.id)
            res.json({ name, email, _id })
        })
    } else {
        res.json(null)
    };

});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})

app.post('/upload/by-link', async (req, res) => {
    try {
        const { link } = req.body;
        const newName = 'photo' + Date.now() + '.jpg';


if (link.startsWith('http:') || link.startsWith('https:')) {
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName
    });
    res.json(newName);
} else {
    res.status(400).json('Invalid image URL');
}
    } catch (error) {
        console.error('Error in image upload:', error);
        res.status(500).send('Internal Server Error');
    }
})


const photoMiddleware = multer({dest:'uploads/'})

app.post('/upload', photoMiddleware.array('photos', 100), (req, res) => {
    
    const uploadedFiles = [];

    for (i = 0; i < req.files.length; i++){
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/',''));
    }
    res.json(uploadedFiles);
})

app.post('/places', async(req, res) => {
    const { token } = req.cookies;
    const { title, address, addedPhotos,
        description, perks, extraInfo, checkIn,
        checkOut,maxGuests,
    
    } = req.body

    jwt.verify(token, jwtSecretKey, async (err, user) => {
        if (err) throw err;
        const placeDocument = await Place.create({
            owner: user.id,
            title, address, addedPhotos,
            description, perks, extraInfo, checkIn,
            checkOut, maxGuests,
        });
        
        res.json(placeDocument)
    });

})





app.listen(4000, () => {
    console.log("server connected");
})