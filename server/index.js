const app = require('express')();
const cloudinary = require('cloudinary');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.json());


// endpoint for signature request
app.get('/api/upload', (req, res) => {

// get a timestamp in seconds which is UNIX format
    const timestamp = Math.round((new Date()).getTime() / 1000);

// cloudinary API secret stored in the .env file
    const api_secret  = process.env.CLOUDINARY_SECRET_API;

// user built in cloudinary api sign request function to  create hashed signature with your api secret and UNIX timestamp
    const signature = cloudinary.utils.api_sign_request({ timestamp: timestamp }, api_secret);

// make a signature object to send to your react app
    const payload = {
        signature: signature,
        timestamp: timestamp
    };
        res.json(payload);
})


    


app.listen(4000, ()=> console.log('listening on port 4000'))