import React from "react";
import { useState } from "react";
import './App.css'
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Services =(props) => {
    const {loggedIn , email} = props
    const navigate= useNavigate()
    const [generatedImage, setGeneratedImage] = useState(null);
    const [prompt, setPrompt] = useState('');

    const onButtonClick = () =>
    {
        if (loggedIn) {
            localStorage.removeItem('user')
            props.setLoggedIn(false)
          } else {
             
             navigate('/Form')
            
          }
    }

    const generateImage = async () => {
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/generate-image', {
                prompt: prompt
            });
            setGeneratedImage(response.data.image_url);
        } catch (error) {
            console.error("Error generating image:", error);
        }
    };
    return(
        <div className={'mainContainer'}>
        <button className='backButton' type="button" onClick={() => navigate('/Launch')}>Back home</button>
        <div className={'servicestitle'}>
        <p className="para">Welcome to Custom Tees, your one-stop shop for high-quality custom T-shirts! 
            Whether you're looking to create personalized Tshirts.Ensuring your T-shirts are uniquely yours. With fast printing, reliable delivery, and exceptional customer support, we make it simple and affordable to bring your ideas to life. 
            Experience the difference with CustomTEES today! </p>
            
      </div>
      <div className="paragra">
      <p>we have a best service for your preferece. Give your own logo/image we will printed on that tshirt. And delivered within a week.<br></br>If you want to upload your own logo please fill this form.</p>
      <button type="button" onClick={onButtonClick}>click here</button>
      </div>
      <div className="imageGeneration">
                <input 
                    type="text" 
                    value={prompt} 
                    onChange={(e) => setPrompt(e.target.value)} 
                    placeholder="Enter image description" 
                />
                <button type="button" onClick={generateImage}>Generate Image</button>
                {generatedImage && <img src={generatedImage} alt="Generated" />}
            </div>
      </div>
    )
}

export default Services