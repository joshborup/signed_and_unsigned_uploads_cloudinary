const app = require('express')();
const Cloudinary = require('cloudinary');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.json());


//endpoint for signature request
app.get('/api/test', (req, res) => {

//get a time stamp in seconds which is UNIX format
    const timestamp = Math.round((new Date()).getTime() / 1000);

// Cloudinary API secret stored in the .env file
    const api_secret  = process.env.CLOUDINARY_SECRET_API;

//user built in cloudinary api sign request function to  create hashed signature with your api secret and UNIX timestamp
    const signature = Cloudinary.utils.api_sign_request({ timestamp: timestamp }, api_secret);

// craft a signature payload to send to the client (timestamp and signature required, api_key either sent here or stored on client)
    const payload = {
        signature: signature,
        timestamp: timestamp
    };
        res.json(payload);
})


    


app.listen(4000, ()=> console.log('listening on port 4000'))