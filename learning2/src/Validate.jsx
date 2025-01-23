import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ForgetPassword from "./ForgetPassword";

const Validate = (props) => {

    const [otp, setOtp] = useState('')
    const [otpValidated, setOtpValidated] = useState(false);
    const [resendotp, setResendotp] = useState(false);
    const [emailError, setEmailError] = useState('')
    const [otpSent, setOtpSent] = useState(false);


    const navigate = useNavigate()
    const validateOtp = () => {
        const storedEmail = JSON.parse(localStorage.getItem('user'));
        const email = storedEmail['email']
        let request_body =
            { email: email, otp: otp }
        console.log("email", request_body)
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/validate-otp", request_body)
            .then(response => {
                if (response.data.message === 'OTP is valid.') {
                    toast.success('OTP validated successfully!');
                    setOtpValidated(true);
                    setTimeout(() => {
                        navigate('/changePassword');
                    }, 3000);

                }
                else {
                    toast.error('Invalid or expired OTP.');
                    setResendotp(true);
                }
            })
            .catch(error => {
                console.error('There was an error validating the OTP!', error);
                toast.error('There was an error validating the OTP!');
            });

    };
    const OtpSent = () => {
        const storedEmail = JSON.parse(localStorage.getItem('user'));
        const email = storedEmail['email']

        setEmailError('');
        setOtpSent(false);
    
        // if ('' === email) {
        //   setEmailError('Please enter your email')
        //   return
        // }
    
        // if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        //   setEmailError('Please enter a valid email')
        //   return
        // }
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
        <>
            <div className={'mainContainer'}>
                <ToastContainer />
                <div className={'titleContainer'}>
                    <div>E-mail</div>
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        type="text"
                        value={otp}
                        placeholder="Enter your OTP here"
                        onChange={(ev) => setOtp(ev.target.value)}
                        className={'inputBox'}
                    />
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input className={'inputButton'} type="button" onClick={validateOtp} value={'Validate OTP'} />
                    {otpValidated && <p>OTP is validated. Now you change your password </p>}

                </div>
                <br />

                {resendotp && <div className={'inputContainer'}>
                    <input className={'inputButton'} type="button" onClick={OtpSent} value={'ReSend OTP'} />
                    {otpSent && <p>OTP sent. Please check your email </p>}</div>}
            </div>
        </>
    )
}

export default Validate