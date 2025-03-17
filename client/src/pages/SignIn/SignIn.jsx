import { useEffect, useState, useContext } from "react"
import React from 'react'
import { AppContext } from "../../AppContext";
import axiosInstance from "../../utils/axiosInstance";

const SignIn = () => {

  const [ mode, setMode ] = useState('Login');

  const { user, setUser, setSignedIn, setIsSigning } = useContext(AppContext);

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ error, setError ] = useState('');

  const handleSignIn = async (e) => {

    e.preventDefault();

    // Login API call
    if (mode==='Login'){ 

      if (!email) {
        setError('Please enter your email');
      }
      if (!password) {
        setError('Please enter your password');
      }

      try {
        
        const response = await axiosInstance.post('/login', { email: email, password: password });

        if (response.data && response.data.accessToken) {
          localStorage.setItem('token', response.data.accessToken);
          setUser({ fullName: response.data.fullName, email: email });
          setSignedIn(true);
          setIsSigning(false);
          setPassword('');
        }

      } catch (error) { 

        if (error.response && error.response.data && error.response.data.message ){
          setError( error.response.data.message );
        } else {
          console.log(error.response)
          setError( 'An unexpected error has occured' );
        }

      }

    }

    // Register API call
    if (mode==='Register'){

      if (!name) {
        setError('Please enter your name');
      }
      if (!email) {
        setError('Please enter your email');
      }
      if (!password) {
        setError('Please enter your password');
      }

      try {
        
        const response = await axiosInstance.post('/register', { fullName: name, email: email, password: password });

        if (response.data && response.data.accessToken) {
          localStorage.setItem('token', response.data.accessToken);
          setUser({ fullName: response.data.fullName, email: email });
          setSignedIn(true);
          setIsSigning(false);
          setPassword('');
        }

      } catch (error) { 

        if (error.response && error.response.data && error.response.data.message ){
          setError( error.response.data.message );
        } else {
          console.log(error.response)
          setError( 'An unexpected error has occured' );
        }

      }

    }


  }

  useEffect(()=>{
   return 
  },[mode])

  return (
    <div className='w-50 bg-white rounded-xl'>

      <div className='flex justify-evenly items-center border-b p-1'>

        <button onClick={()=>setMode('Register')} className={`${mode === 'Register' ? 'text-black': 'text-gray-700'}`}>Register</button>
        <button onClick={()=>setMode('Login')} className={`${mode === 'Login' ? 'text-black': 'text-gray-700'}`}>Login</button>

      </div>

      <div className='flex flex-col h-70 items-center justify-evenly p-5'>

        <input 
          type="text" 
          value={name} 
          onChange={({target})=>setName(target.value)} 
          placeholder='Full Name' 
          className={`${mode !== 'Register' ? 'hidden' : ''} text-center border-b outline-none`}
        />
        <input 
          type="email" 
          value={email} 
          onChange={({target})=>setEmail(target.value)} 
          placeholder='Email Address' 
          className="text-center border-b outline-none"
        />
        <input 
          type="password" 
          value={password} 
          onChange={({target})=>setPassword(target.value)} 
          placeholder='Password' 
          className="text-center border-b outline-none"
        />

        {error && <p className="">{error}</p> }

        <button onClick={handleSignIn}>{mode}</button>

      </div>
    </div>
  )
}

export default SignIn;