import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar';
import { AppContext } from '../../AppContext';

const Home = () => {

    const { isSigning } = useContext(AppContext);

    const navigate = useNavigate();

    const redirectToEvents = () => {
        navigate('/events');
    }

  return (
    <>
    <div className='flex flex-col mt-12'>
        <div className='flex flex-col lg:flex-row justify-between relative animate-fade-in'>
            <div className={`mt-30 mx-6 flex flex-col transition-all duration-400 ${isSigning ? 'opacity-0' : 'opacity-100'}`}>
                <h3 className='text-5xl sm:text-7xl font-bold font-montserrat text-center'>Welcome</h3>
                <h2 className='text-xl text-center font-medium mt-20 mb-4'>Bringing Communities Together</h2>
                <p className='my-4 text-center sm:w-150 text-lg italic font-inter'>Connect with like-minded people, explore events, and engage with your community in meaningful ways.
                </p>
                <div className='flex flex-col justify-center items-center mt-10'>
                    <p className='font-inter font-medium text-lg text-center'>Don't miss out on what's happeing in your city!</p>
                    <button 
                        className='cta-button text-2xl rounded-2xl font-medium bg-[#e48f7a] text-[#fff5f0] mt-4 px-2 py-2 cursor-pointer w-60 self-center transition-all hover:scale-110 hover:shadow-xl'
                        onClick={redirectToEvents}
                        > Explore Events!
                    </button>
                </div>
            </div>
            <div className={`h-auto sm:mx-auto mt-5 xl:mr-30 transition-all ease-out duration-1500 ${isSigning ? 'lg:-translate-x-140' : 'lg:translate-x-0'}`}>
                <video src="/bgClips/Timeline.mov" className='min-h-100 sm:h-170 rounded-xl' autoPlay muted loop playsInline ></video>
            </div>
        </div>
        <div className='flex'>
            <section className="text-center py-12 bg-transparent mx-auto w-3/4">
                <h2 className="text-3xl font-bold ">Our Mission</h2>
                <p className="mt-4 text-lg text-gray-700 ">
                    Communion is a platform designed to unite people through meaningful events. 
                    Whether it's a religious gathering, a social festival, or a charity drive, 
                    we make it easy to connect and participate.
                </p>
                <div className='flex flex-row lg:flex-col justify-center'>
                    <div className='flex flex-col lg:flex-row justify-evenly  mt-10'>
                        <img src="/images/row11.jpg" alt="11" className='min-h-20 max-h-45 w-auto rounded-xl transition-all ease-out duration-500 hover:scale-120'/>
                        <img src="/images/row12.webp" alt="12" className='min-h-20 max-h-45 w-auto rounded-xl transition-all ease-out duration-500 hover:scale-120'/>
                        <img src="/images/row13.png" alt="13" className='min-h-20 max-h-45 w-auto rounded-xl transition-all ease-out duration-500 hover:scale-120'/>
                    </div>
                    <div className='flex flex-col lg:flex-row justify-evenly  mt-10'>
                        <img src="/images/row21.webp" alt="11" className='min-h-20 max-h-45 w-auto rounded-xl transition-all ease-out duration-500 hover:scale-120'/>
                        <img src="/images/row22.jpg" alt="12" className='min-h-20 max-h-45 w-auto rounded-xl transition-all ease-out duration-500 hover:scale-120'/>
                        <img src="/images/row23.jpeg" alt="13" className='min-h-20 max-h-45 w-auto rounded-xl transition-all ease-out duration-500 hover:scale-120'/>
                    </div>
                </div>
            </section>
        </div>
    </div>
    </>
  )
}

export default Home