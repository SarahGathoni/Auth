import React, { useState, useEffect, useRef } from 'react';
import { faTimes, faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import {ThemeContext} from './ThemeContextApi'




import axios from 'axios';

//username regex:^[a-zA-Z]: Ensures the username starts with a letter.
//[a-zA-Z0-9_]{2,19}$: Allows 3 to 23 characters of letters, numbers, or underscores after the first letter.
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
//Password Regex (Requires at least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character)
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//email REGEX
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/



export default function Signup() {
    const [sucessSubmit, setSuccessSubmit] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    
        const theme = useContext(ThemeContext);
        const night = theme.state.nightMode;
      
    
    

    const postDataToServer = async () => {
        
        try {
           /* const { username, email, password, confirmpassword } = formData;*/
            // Send POST request to the server using Axios
            const response = await axios.post('http://localhost:3500/register', {user, email, pwd, matchPwd},{
                headers: {
                    'Content-Type': 'application/json',},
            
                });

            // Handle the response, show a success message
            console.log('Data sent successfully:', response.data);

            if (response.data.message) {
                setSuccessMessage(response.data.message);

                //hide success message after 10sec
               const timeoutId = setTimeout(() =>{
                    setSuccessMessage('')
                },3000);

                // clear timeout on component unmount
        return () => clearTimeout(timeoutId);
              }
        } catch (error) {
            // Handle errors, show an error message
            console.error('Error sending data:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postDataToServer();
    };

    const checkSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from submitting
        try {
            await handleSubmit(e);
            console.log('Data sent successfully' );

            
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const userRef = useRef();
   const errRef = useRef();

   const [user, setUser] = useState('')
   const [validName, setValidName] = useState(false)
   const [userFocus, setUserFocus] = useState(false)

   //EMAIL
   const [email, setEmail] = useState('')
   const [validEmail, setValidEmail] = useState(false)
   const [emailFocus, setEmailFocus] = useState(false)

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

   //VALIDATE EMAIL
   useEffect(() =>{
    setValidEmail(EMAIL_REGEX.test(email))
    console.log(email)
   }, [email])
   

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
   }, [user, pwd, matchPwd])

    return (
        <>
        <div  >
            <p ref={errRef} className={errMsg ? 'errmsg' : "offscreen"} aria-live='assertive'>{errMsg} </p>
            <form className={`form mx-auto ${night ? "bg-black text-white" : "bg-white text-black"}`}  onSubmit={handleSubmit}>
                <p className="title">Sign Up </p>
                <p className="message">Signup now and get full access to our app. </p>
                <div className="flex">
                    <label htmlFor = "username">
                    <span>Username</span>
                    <span>
                    {validName ? (<div> <FontAwesomeIcon icon={faCheck} className='text-green-500'/> </div>):null
                    
                    }
                    
                        </span>
                    

                        <input
                            id = "username"
                            autoComplete='off'
                            required=""
                            placeholder=""
                            type="text"
                            name='username'
                            onChange={(e) => setUser (e.target.value)}
                            value={user}
                            className='input'
                            ref={userRef}
                            aria-invalid={validName ? 'false' : 'true'}
                            aria-describedby='uidnote'
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            
                        />
                        {userFocus && user && !validName ?(
                            <p id="uidnote" className= "instructions">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        ) : null}
                        
                    
                    </label>  
                    
                    
                </div>

                <label>
                <span>Email</span>
                    {validEmail ? (<div> <FontAwesomeIcon icon={faCheck} className='text-green-500'/> </div>):null}
                    <input
                        id = "email"
                        required=""
                        placeholder=""
                        type="email"
                        name='email'
                        onChange={(e) => setEmail (e.target.value)}
                        value={email}
                        className="input"
                    />
                    
                </label>

                <label>
                    
                <span>Password</span>
                {validPwd ? (<div><FontAwesomeIcon icon={faCheck} className='text-green-500'/></div>):
                null
                }
                
                    <input
                        id='password'
                        required=""
                        placeholder=""
                        type="password"
                        name='password'
                        onChange={(e) => setPwd ( e.target.value)}
                        value={pwd}
                        className="input"
                        onFocus={() =>setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        aria-invalid={validPwd ? 'false' : 'true'}
                    />
                    {pwdFocus && pwd && !validPwd ?(
                            <p id="uidnote" className= "instructions">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        ) : null}
                </label>

                <label>
                <span>Confirm password</span>
                
                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                
                
                           
                 
                    <input
                        required=""
                        id="confirm_pwd"
                        placeholder=""
                        type="password"
                        name='confirmpassword'
                        onChange={(e) => setMatchPwd (e.target.value)}
                        value={matchPwd}
                        className="input"
                        
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                </label>
                {validName || validPwd || validMatch ||validEmail ? (<button className="submit text-center" onClick={checkSubmit}>Sign Up</button>
                ): <button disabled  >Sign Up</button>

                
                }
                {successMessage && <p className="text-center" >sent successfully</p>}
                
                <p className="signin">
                    Already have an account? <a href="#"/>Signin
                </p>
            </form>
            </div>
        </>
    )
}
