import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const CLOUDINARY_UPLOAD_PRESET = 'unsigned_preset';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/saturnslist/image/upload';

export default class UploadForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            uploadedFileCloudinaryUrl: ''
        }
    }

    handleImageUpload = (file) => {


        axios.get('/api/test').then(response => {
            console.log(response.data.signature)
        
//for signed uploads

        let formData = new FormData();
        formData.append("signature", response.data.signature)
        formData.append("api_key", "635226183275142");
        formData.append("timestamp", response.data.timestamp)
        formData.append("file", file[0]);


//for unsigned uploads

        // let formData = new FormData();
        // formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        // formData.append("file", file[0]);
        

// uncomment to see what the form looks like in console

        // for(var pair of formData.entries()) {
        //     console.log(pair); 
        //  }
            
        axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => {
            console.log(response.data);
            this.setState({
                uploadedFileCloudinaryUrl: response.data.secure_url
            })
        }).catch( err => {
            console.log(err);
        })
        
    })
    }     

    render() {
        return (
            <div className='upload-form'>
            { 
            this.state.uploadedFileCloudinaryUrl
            ? 
            <div className='image-container'>
                <img src={this.state.uploadedFileCloudinaryUrl}/>
                <Dropzone
                        multiple={false}
                        accept="image/*"
                        onDrop={this.handleImageUpload}
                        className='dropzone'
                        >
                        <p>Again</p>
                    </Dropzone>
            </div>
            :
            <div>
                <Dropzone
                    multiple={false}
                    accept="image/*"
                    onDrop={this.handleImageUpload}
                    className='dropzone'
                    >
                    <p>Upload</p>
                </Dropzone>
                {/* <input type='file' onChange={(e) => this.handleImageUpload(e.target.files[0])} /> */}
            </div>
            }
            </div>
        );
    }
}