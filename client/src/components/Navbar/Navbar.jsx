import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../AppContext';
import SignIn from '../../pages/SignIn/SignIn';
import axiosInstance from '../../utils/axiosInstance';

import { IoMdPower } from "react-icons/io";

const Navbar = () => {
    
    const { user, setUser, signedIn, setSignedIn, setIsSigning, isSigning } = useContext(AppContext);

    const [ navbarShow, setNavbarShow ] = useState(true);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        setSignedIn(false);
    }

    const moveNavbar = () => { 
        setNavbarShow((prev) => !prev ) 
    }

    const getUserInfo = async () => {
        try {
          const response = await axiosInstance.get('/get-user');
          if ( response.data && response.data.user ) {
            setUser({ fullName: response.data.user.fullName, email: response.data.user.email });
            setSignedIn(true);
          } 
        } catch (error) {
            console.log(error)
            // if(error.response?.status === 401) {
            //   localStorage.clear();
            // }
        }
      };

    useEffect(()=>{
        getUserInfo();
    },[])

  return (
        <div className={`backdrop-blur flex justify-between h-12 px-5 py-3 transition-all duration-300 border-b border-neutral-600 sticky relative z-50 ${navbarShow ? 'top-8 lg:top-0' : '-top-4 lg:-top-12'}`}>

            <div className='flex items-center justify-evenly w-100 filter'>
                <button className='relative group cursor-pointer px-2 py-1 rounded-lg transition-all' onClick={()=>{navigate('/'); setIsSigning(false)}}>Home
                    <span className="absolute rounded-lg left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button className='relative group cursor-pointer transition-all duration-500 ease-out px-2 py-1 rounded-lg' onClick={()=>{navigate('/events'); setIsSigning(false)}}>Events
                    <span className="absolute rounded-lg left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button className='relative group cursor-pointer transition-all duration-500 ease-out px-2 py-1 rounded-lg' onClick={()=>{navigate('/about'); setIsSigning(false)}}>About
                    <span className="absolute rounded-lg left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </button>
            </div>

            {
                !signedIn ? <div className='flex w-30 justify-between'>

                <button onClick={()=>{setIsSigning(prev=>!prev); navigate('/')}}>Sign-In</button>

                </div> 
                
                : 
                
                <div className='flex max-w-30 justify-between items-center'>
                    <p className=' relative group cursor-pointer border border-transparent transition-all duration-500 ease-out hover:bg-orange-200 px-2 py-1 rounded-lg sm:mr-5 hover:border-black' onClick={()=>navigate('/your-profile')}>{user?.fullName.split(' ')[0]}
                    </p>
                    <button className='hidden sm:block font-medium text-lg transition-all ease-in cursor-pointer hover:text-orange-500 hover:bg-white p-1 rounded-full' onClick={handleLogout}><IoMdPower /></button>
                </div> 
            }

                <div className={`rounded-xl w-8/10 sm:w-9/10 lg:w-97/100 lg:px-24 absolute h-auto flex justify-center lg:justify-end top-15 transition-opacity ease-out duration-700 ${isSigning ? 'z-5 opacity-100' : 'opacity-0 -z-1'}`}>
                    <SignIn />
                </div>


                <div className='flex flex-col items-center z-5 absolute bg-transparent right-6 top-12 h-auto w-10'>
                    <div className='cursor-pointer bg-yellow-500 h-15 w-1 transition-all duration-300 hover:h-20' onClick={moveNavbar}></div>
                    <img src="/lantern.svg" alt="" className='h-10 w-10 cursor-pointer rounded-full transition-all ease-out duration-700 hover:bg-yellow-200' onClick={moveNavbar}/>
                </div>

        </div>
  )
}

export default Navbar