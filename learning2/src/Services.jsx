import React from "react";
import './App.css'
import { Navigate, useNavigate } from "react-router-dom";

const Services =(props) => {
    const {loggedIn , email} = props
    const navigate= useNavigate()
    

    const onButtonClick = () =>
    {
        if (loggedIn) {
            localStorage.removeItem('user')
            props.setLoggedIn(false)
          } else {
             
             navigate('/Form')
            
          }
    }
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
      </div>
    )
}

export default Services