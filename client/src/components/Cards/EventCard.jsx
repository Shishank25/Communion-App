import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'
import { useNavigate } from 'react-router-dom';

const EventCard = ({ id, title, description, date, category, location }) => {

      const { categoryColors } = useContext(AppContext);

      const navigate = useNavigate();
  
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

  return (
    <div className={`animate-fade-in border-5 ${categoryColors[category]} flex flex-col sm:flex-row justify-between h-64 max-w-70 sm:max-w-9/10 py-3 px-5 rounded-lg shadow-lg`} onClick={()=>{navigate(`/events/${id}`)}}>
        <div className='flex flex-col w-full'>
            <div className='flex justify-between'>
              <p className='text-xs'>{formattedDate}</p>
              <p className='text-xs'>{location}</p>
            </div>
            <div className='text-xl my-1'>{title}</div>
            <p className='text-gray-800 overflow-hidden h-40'>
                {description}
            </p>
        </div>
    </div>
  )
}

export default EventCard