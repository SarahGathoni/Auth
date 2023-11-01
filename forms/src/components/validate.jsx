import React, {useState, useEffect, useRef} from 'react';

//username regex:^[a-zA-Z]: Ensures the username starts with a letter.
//[a-zA-Z0-9_]{2,19}$: Allows 2 to 19 characters of letters, numbers, or underscores after the first letter.
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;

//Password Regex (Requires at least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character)
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

import React from 'react'

const Validate = () => {
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
    const validUsername = USER_REGEX.test(user)
    console.log(user)
    setValidName(validUsername)
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
    <div>
      
    </div>
  )
}

export default Validate

