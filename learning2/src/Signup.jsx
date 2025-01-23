import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './App.css'
import axios from "axios";
import { toast,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = (props) => {
    const { loggedIn } = props
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [signup, setSignup] = useState('');
    const navigate = useNavigate()
    const onButtonClick = () => {
        // You'll update this function later...
        setEmailError('')
        setPasswordError('')

        // Check if the user has entered both fields correctly
        if ('' === email) {
            setEmailError('Please enter your email')
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email')
            return
        }

        if ('' === password) {
            setPasswordError('Please enter a password')
            return
        }

        if (password.length < 7) {
            setPasswordError('The password must be 8 characters or longer')
            return
        }
        let request_body = {
            fullname: fullName,
            email: email,
            password: password
        }
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/signup", request_body)
        .then((response) => {
            if (response.data.message === 'User already exists') {
                toast.warn(`${response.data.message}.Please provide unique email id `);
            } else {
                setSignup(response.data.message);
                toast.success(`Successfully Signed up for ${email}`);
                setTimeout(() => {
                    navigate('/Login');
                }, 3000);
                localStorage.setItem('user', JSON.stringify({ email }));
            }
        })
            .catch((error) => {
                toast.error(`Error: ${error.response.data.message}`);
            })

    }
    return (
        <>
            <div className={'mainContainer'}>
                <ToastContainer />
                <button className='backButton' type="button" onClick={() => navigate('/Launch')}>Back home</button>
                <div className={'titleContainer'}>
                    <div>Signup</div>
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        value={fullName}
                        placeholder="Enter your fullname"
                        onChange={(ev) => setFullName(ev.target.value)}
                        className={'inputBox'}
                    />
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        value={email}
                        placeholder="Enter your email here"
                        onChange={(ev) => setEmail(ev.target.value)}
                        className={'inputBox'}
                    />
                    <label className="errorLabel">{emailError}</label>
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        type='password'
                        required
                        value={password}
                        placeholder="Enter your password here"
                        onChange={(ev) => setPassword(ev.target.value)}
                        className={'inputBox'}
                    />
                    <label className="errorLabel">{passwordError}</label>
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Sign Up'} />
                </div>

            </div>

        </>
    )
}

export default Signup