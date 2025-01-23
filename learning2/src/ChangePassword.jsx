import {React ,useState} from "react";
import './App.css'
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ChangePassword = (props) =>{
    const {loggedIn} = props
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const navigate = useNavigate()

    const handlePasswordChange = (event) => { 
        setPassword(event.target.value); 
        validatePassword(event.target.value, confirmPassword); 
    }; 
    const handleConfirmPasswordChange = (event) => { 
        setConfirmPassword(event.target.value); 
        validatePassword(password, event.target.value); 
    };
    const validatePassword = (password, confirmPassword) => { 
        if (password !== confirmPassword) { 
            setPasswordError('Passwords do not match'); 
        } else { 
            setPasswordError(''); 
        } 
    };
    const onButtonClick =() => {
        const storedEmail = JSON.parse(localStorage.getItem('user'));
        const email = storedEmail['email']

        setPasswordError('')

        if ('' === password) {
            setPasswordError('Please enter a password')
            return  
          }
        
          if (password.length < 7) {
            setPasswordError('The password must be 8 characters or longer')
            return
          }
        //   if (password !== confirmPassword) { 
        //     setPasswordError('Passwords do not match'); 
        // } else { 
        //     setPasswordError(''); 
        // }
        // const storedUser = JSON.parse(localStorage.getItem('user'));
    
        // if (!storedUser || storedUser.email !== email) {
        //   setEmailError('No user found with this email. Please sign up first.');
        //   return;
        // }

    
        let request_body = {
            email: email,
            password: password
        }
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/update-password", request_body)
        .then((response) => {
            if (response.data.message === 'Password updated successfully.'){
                    toast.success(`${response.data.message} for this ${email}`)
                    setTimeout(() => {
                        navigate('/Launch');
                    }, 3000);
            }
            
        })

            .catch((error) => {
                toast.error(`Error: ${error}`)
            });
    };
    
        // const handleSubmit = (event) => { 
        //     event.preventDefault(); 
            // if (password === confirmPassword) { 
            //     alert('Password is valid and matches the confirm password');
            //      // Proceed with form submission or other logic 
            //      } else { 
            //         alert('Passwords do not match'); 
            //     } 
            // };
         
        
    return(
        <>
        <div className={'mainContainer'}> 
            <ToastContainer />
            {/* <form onSubmit={handleSubmit}> */}
        <div className={'titleContainer'}>
          <div>Change Password</div>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
          type="password"
          id='password'
          required
            value={password}
            placeholder="Enter your New password here"
            onChange={handlePasswordChange}
            className={'inputBox'}
          />
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            type='password'
            id='confirmPassword'
            required
            value={confirmPassword}
            placeholder="Enter your password again"
            onChange={handleConfirmPasswordChange}
            className={'inputBox'}
          />
        </div>
        <br />
        <label className="errorLabel" style={{color: 'red'}}>{passwordError}</label>
        <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'change password'} />  
        </div>
        {/* </form> */}
        </div>
        </>
    )
}

export default ChangePassword