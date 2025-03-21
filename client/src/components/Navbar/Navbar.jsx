import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../AppContext';
import SignIn from '../../pages/SignIn/SignIn';
import axiosInstance from '../../utils/axiosInstance';

import { IoMdPower } from "react-icons/io";

const Navbar = () => {
    
    const { getUserInfo, user, signedIn, setSignedIn, setIsSigning, isSigning, handleLogout } = useContext(AppContext);
    const [ navbarShow, setNavbarShow ] = useState(true);
    const navigate = useNavigate();


    const moveNavbar = () => { 
        setNavbarShow((prev) => !prev ) 
    }

    useEffect(()=>{
        getUserInfo();
    },[])

  return (
        <div 
            className={`backdrop-blur font-medium flex w-full shadow-lg 
            justify-between h-12 px-5 py-3 transition-all duration-300 
            border-b border-neutral-600 fixed absolute z-5 
            ${navbarShow ? 'top-0' : '-top-12'}`}
        
        >

            {/* Home, Events and About Buttons */}
            <div className='flex z-3 items-center justify-evenly w-100 filter'>
                <button 
                    className='relative group cursor-pointer px-2 py-1 rounded-lg transition-all' 
                    onClick={()=>{navigate('/'); setIsSigning(false)}}
                >
                    Home
                    <span className="absolute rounded-lg left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </button>

                <button 
                    className='relative group cursor-pointer transition-all duration-500 ease-out px-2 py-1 rounded-lg' 
                    onClick={()=>{navigate('/events'); setIsSigning(false)}}
                >
                    Events
                    <span className="absolute rounded-lg left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </button>

                <button 
                    className='relative group cursor-pointer transition-all duration-500 ease-out px-2 py-1 rounded-lg' 
                    onClick={()=>{navigate('/about'); setIsSigning(false)}}
                >
                    About
                    <span className="absolute rounded-lg left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </button>
            </div>


            {/* Sign In / Profile Buttons */}
            {   !signedIn ? 
                
                <div className='flex w-30 justify-between'>
                    <button 
                        className='cursor-pointer hover:underline'
                        onClick={()=>{ setIsSigning(prev=>!prev); navigate('/'); }}
                    >
                        Sign-In
                    </button>
                </div> 

                : 
                
                <div className='flex max-w-30 justify-between items-center'>
                    <p 
                        className=' relative group cursor-pointer border border-transparent 
                        transition-all duration-500 ease-out hover:bg-orange-200 px-2 py-1 
                        rounded-lg sm:mr-5 hover:border-black' 
                        onClick={()=>navigate('/your-profile')}
                    >
                        {user?.fullName.split(' ')[0]}
                    </p>
                    <button 
                        className='hidden sm:block font-medium text-lg transition-all ease-in 
                        cursor-pointer hover:text-orange-500 hover:bg-white p-1 rounded-full' 
                        onClick={()=> {handleLogout(); navigate('/')}}
                    >
                        <IoMdPower />
                    </button>
                </div> 
            }

                <div 
                    className={`
                    rounded-xl w-8/10 sm:w-9/10 lg:w-97/100 lg:px-24 absolute top-15 h-auto flex 
                    justify-center lg:justify-end duration-700 transition-opacity ease-out 
                    ${isSigning ? 'opacity-100' : 'opacity-0 hidden'}`}
                >
                    <SignIn />
                </div>


                {/* Navbar Toggle */}
                <div className='flex flex-col items-center z-5 absolute bg-transparent right-6 top-12 h-auto w-10'>
                    <div 
                        className='cursor-pointer bg-yellow-500 h-15 w-1 transition-all duration-300 hover:h-20' 
                        onClick={moveNavbar}></div>
                        <img src="/lantern.svg" 
                            alt="O" 
                            className='h-10 w-10 cursor-pointer rounded-full transition-all ease-out duration-700 hover:bg-yellow-200' 
                            onClick={moveNavbar}    />
                </div>

        </div>
  )
}

export default Navbar