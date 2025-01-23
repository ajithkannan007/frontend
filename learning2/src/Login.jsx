import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import reactLogo from '/custom.jpg'
import './App.css'
import ForgetPassword from "./ForgetPassword"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = (props) => {
    const { loggedIn } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loginError, setLoginError] = useState('');
    const [login, setLogin] = useState('')

    const navigate = useNavigate()

    const onButtonClick = () => {
        // You'll update this function later...
        setEmailError('')
        setPasswordError('')
        setLoginError('')

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
        //   const storedUser = JSON.parse(localStorage.getItem('user'));

        //   if (!storedUser) {
        //       setLoginError('No user found. Please sign up first.');
        //       return;
        //   }

        //   if (storedUser.email !== email || storedUser.password !== password) {
        //       setLoginError('Invalid email or password');
        //       return;
        //   }
        //   navigate("/Launch")
        let request_body = {
            email: email,
            password: password
        }
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/login", request_body)
        .then((response) => {
            if (response.data.message === 'Invalid email.') {
                toast.error(`${response.data.message} Please provide the correct email `);
            } 
            else if (response.data.message === 'Invalid password.'){
                    toast.error(`${response.data.message} Please provide the correct password`)
                    localStorage.setItem('user', JSON.stringify({ email }));
            }
            else {
                setLogin(response.data.message);
                toast.success(`Successfully Logged in by ${email}`);
                setTimeout(() => {
                    navigate('/Launch');
                }, 3000);
                localStorage.setItem('user', JSON.stringify({ email }));
            }
        })

            .catch((error) => {
                toast.error(`Error: ${error}`)
            });
    }
    const onclick = () => {
        if (loggedIn) {
            localStorage.removeItem('user')
            props.setLoggedIn(false)
        } else {
            navigate('/ForgetPassword')
        }
    }
    const changep = () => {
        if (loggedIn) {
            localStorage.removeItem('user')
            props.setLoggedIn(false)
        } else {
            navigate('/Signup')
        }
    }
    return (
        <>

            {/* <div>
        <img className="custom" src={reactLogo} alt='custom-Tees' />
    </div> */}
            <div className={'mainContainer'}>
                <ToastContainer />
                <button className='backButton' type="button" onClick={() => navigate('/Launch')}>Back home</button>
                <div className={'titleContainer'}>

                    <div>Login</div>
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
                    <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
                </div>
                {loginError && <label className="errorLabel">{loginError}</label>}
                <div>
                    <input type="button" value="Forget password" onClick={onclick} />
                </div>
                <div>
                    <input type="button" value="or Create new account" onClick={changep} />
                </div>
            </div>

        </>
    )
}

export default Login