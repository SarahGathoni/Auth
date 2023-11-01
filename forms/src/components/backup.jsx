import React, { useState, useEffect, useRef } from 'react';
import { faTimes, faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from 'axios';

//username regex:^[a-zA-Z]: Ensures the username starts with a letter.
//[a-zA-Z0-9_]{2,19}$: Allows 3 to 23 characters of letters, numbers, or underscores after the first letter.
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
//Password Regex (Requires at least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character)
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


export default function Signup() {
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const postDataToServer = async () => {
        try {
            // Send POST request to the server using Axios
            const response = await axios.post('http://localhost:3500/register', formData);

            // Handle the response, show a success message
            console.log('Data sent to server:', response.data);
        } catch (error) {
            // Handle errors, show an error message
            console.error('Error sending data:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postDataToServer();
    };

    const userRef = useRef();
   const errRef = useRef();

   const [user, setUser] = useState('')
   const [validName, setValidName] = useState(false)
   const [userFocus, setUserFocus] = useState(false)

   //EMAIL

   const [pwd, setPwd] = useState('')
   const [validPwd, setValidPwd] = useState(false)
   const [pwdFocus, setPwdFocus] = useState(false)

   const [matchPwd, setMatchPwd] = useState('')
   const [validMatch, setValidMatch] = useState(false)
   const [matchFocus, setMatchFocus] = useState(false)

   const [errMsg, setErrMsg] =  useState('')
   const [success, setSuccess] = useState(false)

   //USEEFECT setting focus on input fields
   useEffect(() =>{
    userRef.current.focus();
   }, [])

   //VALIDATE USERNAME
   useEffect(() =>{
    setValidName(USER_REGEX.test(user))
    console.log('Component Re-rendered:', validName);
    
   }, [user])

   //VALIDATE PWD
   useEffect(()=>{
    const result = PWD_REGEX.test(pwd)
    console.log(pwd)

    setValidPwd(result)

    const match = pwd === matchPwd
    setValidMatch(match)
   }, [pwd, matchPwd])

   //UPDATING ERR MSG
   useEffect(()=>{
    setErrMsg('')
   }, user, pwd, matchPwd)

    return (
        <>
            <p ref={errRef} className={errMsg ? 'errmsg' : "offscreen"} aria-live='assertive'>{errMsg} </p>
            <form className="form mx-auto" onSubmit={handleSubmit}>
                <p className="title">Sign Up </p>
                <p className="message">Signup now and get full access to our app. </p>
                <div className="flex">
                    <label htmlFor = "username">
                    Username
                    <span>
                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        {userFocus && user && !validName && (
                            <FontAwesomeIcon
                            icon={faCheck}
                            className='text-green-500'
                        />
                        )}
                        </span>
                    

                        <input
                            id = "username"
                            autoComplete='off'
                            required=""
                            placeholder=""
                            type="text"
                            name='username'
                            value={formData.username}
                            onChange={handleInputChange}
                            className={`input ${validName ? 'border-green-500' : 'border-red-500'}`}
                            ref={userRef}
                            aria-invalid={validName ? 'false' : 'true'}
                            aria-describedby='uidnote'
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                    
                    </label>  
                    
                    
                </div>

                <label>
                    <input
                        required=""
                        placeholder=""
                        type="email"
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input"
                    />
                    <span>Email</span>
                    
                    

                </label>

                <label>
                    
                <span>Password</span>
                {!validPwd && pwdFocus? (<p className='visible text-red-500'>
                        atleast 8  characters<br />
                        1 uppercase letter, 1 number, 1 special character
                    </p>): <FontAwesomeIcon icon={faCheck} className="text-green-500"/>
                    
                    }
                    <input
                        required=""
                        placeholder=""
                        type="password"
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        className="input"
                        onFocus={() =>setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        aria-invalid={validPwd ? 'false' : 'true'}
                    />
                    
                    <span>
                    
                    
                    </span>
                
                </label>

                <label>
                <span>Confirm password</span>
                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                           
                 <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                    <input
                        required=""
                        id="confirm_pwd"
                        placeholder=""
                        type="password"
                        name='confirmpassword'
                        value={formData.confirmpassword}
                        onChange={handleInputChange}
                        className="input"
                        
                    />
                    
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                </label>

                <button className="submit text-center">Submit</button>
                <p className="signin">
                    Already have an account? <a href="#"/>Signin
                </p>
            </form>
        </>
    );
}
