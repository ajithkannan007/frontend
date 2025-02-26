import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Form.css';
import axios from "axios";

const Form = (props) => {
    const { loggedIn } = props;
    const [fullName, setFullName] = useState("");
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [image, setImage] = useState('');
    const [PreviewImage, setPreviewImage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const file = document.getElementById('image').files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
            let request_body = {
                fullName: fullName,
                contact: contact,
                address: address,
                pincode: pincode,
                image: base64String
            };

            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/submit", request_body)
                .then((response) => {
                    if (response.data.message === 'Form submitted successfully.') {
                        toast.success(`Form has been submitted`);
                        setPreviewImage(reader.result);
                        // setTimeout(() => {
                        //     navigate('/Launch');
                        // }, 3000);
                    }
                    else{
                        toast.error("Form not submitted successfully");
                    }
                })
                .catch((error) => {
                    toast.error(`Error: ${error}`);
                });
        };

        reader.readAsDataURL(file);
    };

    const handleReset = () => {
        setFullName("");
        setContact("");
        setAddress("");
        setPincode("");
        setImage("");
        setRetrievedImage("");
        toast.success("Form has been reset");
    };

    const navigate = useNavigate();

    return (
        <>
            <div className={'mainContainer'}>
                <ToastContainer />
                <button className='backButton' type="button" onClick={() => navigate('/Services')}>Back to services</button>
                <div className={'Formtitle'}>
                    <h1 className="header">Form for custom T-shirts</h1>
                    <fieldset className="fieldset1">
                        <form action="#" method="get" className="formsub">
                            <label htmlFor="fullName" className="labelfor">
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
                                className="input1"
                            />
                            <label htmlFor="contact" className="labelfor">
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
                                className="input1"
                            />
                            <label htmlFor="address" className="labelfor">
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
                                className="textarea1"
                            />
                            <label htmlFor="pincode" className="labelfor">
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
                                className="input1"
                            />
                            <label htmlFor="image" className="labelfor">
                                Upload your Logo/Image
                            </label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                accept="image/png, image/jpeg"
                                onChange={(e) => {
                                    setImage(e.target.value);
                                    const file = e.target.files[0];
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setPreviewImage(reader.result);
                                         };
                                     reader.readAsDataURL(file);
                                }}
                                placeholder="Upload here"
                                required
                                className="input1"
                            />
                             {PreviewImage && (
                                <div>
                                    <h2>Preview Image:</h2>
                                    <img src={PreviewImage} alt="Preview" className="preview-image"/>
                                </div>
                            )}
                            <button
                                type="reset"
                                value="reset"
                                onClick={() => handleReset()}
                                className="button1"
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                value="Submit"
                                onClick={(e) => handleSubmit(e)}
                                className="button1"
                            >
                                Submit
                            </button>
                        </form>
                    </fieldset>
                </div>
            </div>
        </>
    );
};

export default Form;