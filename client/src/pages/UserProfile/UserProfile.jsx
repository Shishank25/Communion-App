import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../AppContext'
import axiosInstance from '../../utils/axiosInstance';
import UserEventCard from '../../components/Cards/UserEventCard';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {

    const { user, setUser, handleLogout } = useContext(AppContext);
    const [ userEvents, setUserEvents ] = useState([]);

    const [ error, setError ] = useState(null);
    const navigate = useNavigate();

    const fetchUserEvents = async () => {
        try{
            const response = await axiosInstance.get('/get-user-events');
            if ( response.data && response.data.events ) {
                setUserEvents( response.data.events );
            } 
        } catch ( error ) {
            setError(error.response.data.message);
        }
    }

    useEffect(()=>{
        fetchUserEvents();
    },[])
    
  return (
    <div className='mt-5 min-h-screen mt-12'>
        <div className=' mx-5'>
            <h2 className='text-3xl'>Welcome {user.fullName.split(' ')[0]}</h2>
            <p className='text-slate-800 italic'>{user.email}</p>
        </div>

        <div className='container mx-auto p-2 sm:p-15'>
        <h2 className='font-bold text-xl font-montserrat font-bold-xl'>Your Events</h2>
            <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 gap-20'>

            {userEvents.map((item, index) => (

                <UserEventCard
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    description={item.description}
                    date={item.date}
                    category={item.category}
                    location={item.location}
                    fetchUserEvents={fetchUserEvents}
                />

                ))
            }
            </div>
        </div>
        <div className='absolute bottom-0 fixed flex border-t-1 justify-center w-full py-2 backdrop-blur-xs'>
            <button 
                className='font-medium cursor-pointer text-gray-700 rounded-xl hover:bg-slate-200 p-2 hover:text-red-500'
                onClick={()=>{handleLogout(); navigate('/');}}>Sign Out</button>
        </div>
    </div>
  )
}

export default UserProfile