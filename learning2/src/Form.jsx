import {React, useState} from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";


const Form =(props) =>{
    const {loggedIn} = props
    const [fullName,setFullName] = useState("")
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('')
    const [pincode, setPincode] = useState('')
    const [image, setImage] = useState('')
     
    const handleSubmit =(e) =>{
        e.preventDefault();
        console.log(
            fullName,
            contact,
            address,
            pincode,
            image
        )
    }
     const handleReset =() => {
        setFullName("");
        setContact("");
        setAddress("");
        setPincode("");
        setImage("");
    }

    const navigate = useNavigate();

    return(
    <>
    <div className={'mainContainer'}>
        <button className='backButton' type="button" onClick={() => navigate('/Services')}>Back to services</button>
        <div className={'Formtitle'}>
            <h1>Form for custom T-shirts</h1>
            <fieldset>
                <form action="#" method="get">
                    <label for="fullName">
                        FullName
                    </label>
                    <input 
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={fullName}
                    onChange={(e) =>
                        setFullName(e.target.value)
                    }
                    placeholder="Enter your fullname"
                    required
                    />
                    <label for="contact">
                        Contact Number
                    </label>
                    <input 
                        type="tel"
                        name="contact"
                        id="contact"
                        value={contact}
                        onChange={(e) => 
                            setContact(e.target.value)
                        }
                    placeholder="Enter your Contact Number"
                    required
                    />
                    <label for="address"> 
                        Delivery Address
                    </label>
                    <textarea 
                        name="address"
                        id="address"
                        value={address}
                        cols="40"
                        rows="5"
                        onChange={(e) => 
                            setAddress(e.target.value)
                        }    
                        placeholder="Enter your delivery address"
                        required
                    />
                    <label for="pincode">
                        Pincode
                    </label>
                    <input 
                        type="number" 
                        name="pincode"
                        id="pincode"
                        maxLength="6"
                        value={pincode}
                        onChange={(e) => 
                            setPincode(e.target.value)
                        }
                        placeholder="Enter your Pincode"
                        required
                    />
                    <label for="image">
                        Upload your Logo/Image
                    </label>
                    <input 
                        type="file"
                        name="image"
                        id="image"
                        value={image}
                        onChange={(e) => 
                            setImage(e.target.value)
                        }
                        placeholder="Upload here"
                        required
                    />

                </form>
            </fieldset>
        </div>
    </div>
    </>)
}

export default Form