import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../AppContext'
import axiosInstance from '../../utils/axiosInstance';
import UserEventCard from '../../components/Cards/UserEventCard';

const UserProfile = () => {

    const { user, setUser } = useContext(AppContext);
    const [ userEvents, setUserEvents ] = useState([]);

    const [ error, setError ] = useState(null);

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
    <div className='mt-5 mx-5 min-h-screen'>
        <div>
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
                    fetchUserEvents={fetchUserEvents}
                />

                ))
            }
            </div>
        </div>
    </div>
  )
}

export default UserProfile