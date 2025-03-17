import React, { useState, useContext } from 'react'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance';
import { AppContext } from '../../AppContext';



const CreateEvent = ({ event, getEvents}) => {

    const [ title, setTitle ] = useState(event?.title || '');
    const [ description, setDescription ] = useState(event?.description || '');
    const [ date, setDate ] = useState(undefined);
    const [ category, setCategory ] = useState(event?.category || '');
    const [ location, setLocation ] = useState(event?.location || '');

    const { openModal, setOpenModal } = useContext(AppContext);

    const [ error, setError ] = useState('');

    const handleEventCreation = async () => {

      if (!title) {setError('Please give your Event a Title'); return}
      if (!description) {setError('Please give a Description of your Event'); return}
      if (!date) {setError('Please set a Date and Time for your Event'); return}
      if (!category) {setError('Kindly set a Category for your Event'); return}


      if( openModal.type === 'create' ) {

          try {
              const response = await axiosInstance.post('/create-event', { title, description, date, category, location });
              if(!response.data.error) {
                  setOpenModal({ isShown: false, type: '', data: null})
              }
              getEvents();
          } catch (error) { 

              if (error.response && error.response.data && error.response.data.message ){
                  console.log(error)
                setError( error.response.data.message );
              } else {
                console.log(error.response);
                setError( 'An unexpected error has occured' );
              }
      
          }
      }

      else if ( openModal.type === 'edit' ) {
        console.log(event);

          try {
            const response = await axiosInstance.put(`/update-event/${event.id}`, { title, description, date, category, location });
            if(!response.data.error) {
                setOpenModal({ isShown: false, type: '', data: null})
                getEvents()
            }
        } catch (error) { 

            if (error.response && error.response.data && error.response.data.message ){
                console.log(error)
              setError( error.response.data.message );
            } else {
              console.log(error.response);
              setError( 'An unexpected error has occured' );
            }

        }
      }

    }

    const deleteEvent = async () => {
      try{ 
        const response = await axiosInstance.delete(`/delete-event/${event.id}`);
        if(!response.data.error) {
          setOpenModal({ isShown: false, type: '', data: null})
          getEvents()
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message ){
          console.log(error)
          setError( error.response.data.message );
          } else {
            console.log(error.response);
            setError( 'An unexpected error has occured' );
            }
    }}


  return (
    <div className='relative h-102 w-70 sm:w-auto sm:max-w-150'>

        <div className='flex flex-col justify-between p-5 h-100'>

            <div className='flex flex-col h-75'>

                <input type="text" placeholder='Event Title' value={title} className='text-2xl outline-none' onChange={({ target })=>setTitle(target.value)}/>
                <textarea name="" id="" placeholder={`Describe the event... \nPlease include Event timings`} value={description} rows={8} className='max-h-75 outline-none mt-4' onChange={({ target })=>setDescription(target.value)}/>

            </div>

            <div className='flex justify-between'>
              <select name="" id="" className='w-50' value={category} onChange={({ target })=>setCategory(target.value)}>
                  <option value="Other" className=''>Other</option>
                  <option value="Religious" className=''>Religious</option>
                  <option value="Social" className=''>Social</option>
                  <option value="Charity" className=''>Charity</option>
                  <option value="Festival" className=''>Festival</option>
                  <option value="Fest" className=''>Fest</option>
              </select>
              <input type="text" placeholder='Location' value={location} className='text-lg outline-none w-50' onChange={({ target })=>setLocation(target.value)}/>
            </div>

            <input type="date" placeholder='' value={date} className='text-sm h-30 w-50 sm:h-auto text-wrap my-4' onChange={({ target })=>setDate(target.value)}/>

            {error && <p className='text-red-500'>{error}</p>}

            { openModal.type !== 'view' && <button className='self-center transition-all w-40 pb-1 text-xl border border-transparent cursor-pointer text-gray-400 hover:text-black hover:bg-gray-300 hover:border-black px-5 rounded-3xl' onClick={handleEventCreation}>{openModal.type} event</button>}
            { openModal.type === 'edit' && <button className='absolute right-5 bottom-7 transition-all w-20 pb-1 text-xl border border-transparent cursor-pointer text-gray-400 hover:text-black hover:text-red-600 hover:border-black rounded-3xl' onClick={deleteEvent}>delete</button>}
            
        </div>

        

        <button className='absolute top-5 right-5 text-xl cursor-pointer transition-all hover:scale-120 hover:bg-gray-400 rounded-full' onClick={()=>setOpenModal({ isShown: false, type: '', data: null})}>
            <MdClose />
        </button>
    </div>
  )
}

export default CreateEvent