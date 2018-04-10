const app = require('express')();
const fileUploader = require('express-fileupload');
const Cloudinary = require('cloudinary');
const bodyParser = require('body-parser');
const crypto = require('crypto');
require('dotenv').config();

app.use(bodyParser.json());
app.use(fileUploader());

app.get('/api/test', (req, res) => {

    const timestamp = Math.round((new Date()).getTime() / 1000);
    const api_secret  = process.env.CLOUDINARY_API;

    const signature = Cloudinary.utils.api_sign_request({ timestamp: timestamp }, api_secret);

    // craft a signature payload to send to the client (timestamp and signature required, api_key either sent here or stored on client)
    const payload = {
        signature: signature,
        timestamp: timestamp
    };

                  res.json(payload);

})


    


app.listen(4000, ()=> console.log('listening on port 4000'))