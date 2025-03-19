import React, { useState, useContext } from 'react'
import Modal from 'react-modal'
import CreateEvent from '../../pages/EventsListing/CreateEvent'
import { AppContext } from '../../AppContext'

const UserEventCard = ({ id, title, description, date, category, location, fetchUserEvents }) => {

  const { categoryColors, openModal, setOpenModal } = useContext(AppContext);

  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'short' 
  });
  const [ event , setEvent ] = useState({ id, title, description, date: formattedDate, category, location })


  return (
    <div
      className={`border-5 flex flex-col sm:flex-row justify-between max-h-60 
      max-w-70 sm:max-w-9/10 py-3 px-5 rounded-lg shadow-lg relative
      ${categoryColors[category]?.border}`}
      
    >
        <div className='flex flex-col max-w-1/2'>

          {/* Formatted Date and Location  */}
          <div className='flex justify-between'>
            <p className='text-xs'>{formattedDate}</p>
            <p className='text-xs'>{location}</p>
          </div>

          {/* Event Title and Description  */}
          <div className='text-xl my-1'>{title}</div>
          <p className='text-black p-1 overflow-hidden h-40'>
              {description}
          </p>
        </div>


        <button 
          className='absolute top-8 right-8 transition-all w-20 pb-1 text-xl 
          border border-transparent cursor-pointer text-gray-600 hover:text-black 
          hover:text-blue-700 hover:border-black rounded-3xl' 
          onClick={()=>setOpenModal({ isShown: true, type: 'edit', data: event})}
        >
          Edit
        </button>

        <Modal
          isOpen={openModal.isShown}
          onRequestClose={()=>{}}
          style={{ overlay: { backgroundColor: 'rgba(0,0,0,0.5)' }}}
          className='w-[40%] max-h-3/5 mx-auto mt-20 bg-slate-300 rounded-3xl'
          ariaHideApp={false}
        >
          <CreateEvent event={openModal.data} getEvents={fetchUserEvents}/>
        </Modal>

    </div>
  )
}

export default UserEventCard