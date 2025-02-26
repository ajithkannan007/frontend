import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './App.css'
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = (setResendotp) => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate()

  const onButtonClick = () => {
    setEmailError('');
    setOtpSent(false);

    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser || storedUser.email !== email) {
      setEmailError('No user found with this email. Please sign up first.');
      return;
    }

    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/send-otp",{email: email})
      .then((response) => {
        if (response.data.message == 'OTP sent successfully') {
          setOtpSent(true);
          toast.success(`${response.data.message} to ${email}`);
          setTimeout(() => {
            navigate('/Validate');
          }, 3000);
        } else {
          toast.error(`There was an error sending the OTP! to ${email}`);

        }
      })
      .catch(error => {
        console.error('There was an error sending the OTP!', error);
        if (error.response) {
          // Server responded with a status other than 200 range
          toast.error(` ${error.response.data.message}`);
        } else if (error.request) {
          // Request was made but no response received
          toast.error('Network error: No response received from the server.');
        } else {
          // Something else happened while setting up the request
          toast.error(`Error: ${error.message}`);
        }
      });


  };



  return (
    <div className={'mainContainer'}>
      <ToastContainer />
      <div className={'titleContainer'}>
        <div>E-mail</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="email"
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
    
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Send OTP'} />
        {otpSent && <p>OTP sent. Please check your email </p>}</div>
        
    </div>
  )
};


export default ForgetPassword