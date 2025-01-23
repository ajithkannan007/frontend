import React from "react";
import reactLogo from '/custom.jpg'
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const Launch = (props) => {
    const { loggedIn, email } = props
    const navigate = useNavigate()
  
    const onButtonClick = () => {
      // You'll update this function later
      if (loggedIn) {
          localStorage.removeItem('user')
          props.setLoggedIn(false)
        } else {
           
           navigate('/Login')
          
        }
        
    }
    const onclick = () =>{
        if (loggedIn) {
            localStorage.removeItem('user')
            props.setLoggedIn(false)
          } else {
             
             navigate('/Signup')
            
          }
    }

 return (
    <>
     <div >
      <img className="custom" src={reactLogo} alt='custom-Tees' />
      <header className='logo' >Custom Tees</header>
      <button className='home'>Home</button>
      <select  className='categories' name='category'>
        <option value='caregories' hidden>categories</option>
        <option value='men'>men</option>
        <option value='women'>women</option>
        
      </select>
      <button className='services' type="button" onClick={() => navigate('/Services')}>services</button>
      <label>
        <input className="login-page" type='button' value='login' onClick={onButtonClick} />
      </label>
      <label>
      <input className="signup-page" type="button" value='Signup' onClick={onclick} /> 
      </label>
      <h2 className="textimage">your style, your brand.Design Custom T-shirts That Make a Lasting Impression</h2>
      <label>
      <input className='getstarted' type='button' value='Get Started' onClick={onButtonClick} />
      </label>
    </div>
    </>
 )
}

 export default Launch