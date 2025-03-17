import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { AppContext } from '../../AppContext'
import { useParams } from 'react-router-dom'

const EventPage = () => {

    const { eventId } = useParams();
    const [ event, setEvent ] = useState(null);
    const [ error, setError ] = useState(null);

    const dateObj = new Date(event?.date);
    const formattedDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

    const fetchEvent = async () => {
        const response = await axiosInstance.get('/fetch-event/' + eventId);
        
        try {
            if (response.data && response.data.event) {
                setEvent( response.data.event );
                setError('');
            }
        } catch (error) {
            setError('Sorry, unable to find this event');
        }
    }

    useEffect(()=>{
        fetchEvent();
    },[])

  return (
    <div className='ml-10 h-screen max-w-screen sm:w-150'>
        {error && <p> {error} </p> }
        {event && 
            <div className='flex flex-col justify-evenly min-h-100 h-auto '>
                <div>
                    <p className='italic text-slate-700'>{event.category}</p>
                    <h1 className='font-montserrat font-bold text-5xl mb-10'>{event.title}</h1>
                    <div className='flex justify-between w-screen sm:w-90'>
                        <span>{formattedDate}</span>
                        <span>{event.location}</span>
                    </div>
                </div>
                    
                <p>{event.description}</p>
            </div> 
        }
    </div>
  )
}

export default EventPage