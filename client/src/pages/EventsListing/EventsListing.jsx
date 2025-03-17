import React, { useEffect, useState, useContext } from 'react'
import EventCard from '../../components/Cards/EventCard'
import CreateEvent from './CreateEvent'
import Modal from 'react-modal'
import axiosInstance from '../../utils/axiosInstance'

import { MdClose } from 'react-icons/md'

import { FaSearch } from "react-icons/fa";
import { AppContext } from '../../AppContext'

const EventsListing = () => {

    const [ searchTerm, setSearchTerm ] = useState('');
    const [ category, setCategory ] = useState('All');

    const [ allEvents, setAllEvents ] = useState([]);

    const [ error, setError ] = useState(null);

    const { openModal, setOpenModal, signedIn, categoryColors } = useContext(AppContext)

    const getEvents = async () =>{
        try{
            const response = await axiosInstance.get('/get-events');
            console.log(response);
            if( response.data ) {
                console.log(response)
                setAllEvents(response.data.events);
            }
        } catch (error) {
            console.log(error.response);
        }

    } 

    const searchEvents = async (e) => {
        e?.preventDefault();
        if (searchTerm.trim() !== '') {

            try{
                const response = await axiosInstance.get(`/search-events?searchTerm=${searchTerm}`);
                console.log(response);
                if( response.data ) {
                    let events = response.data.events;

                    // Apply category filter after searching
                    if (category !== 'All') {
                        events = events.filter(event => event.category === category);
                    }

                    setAllEvents(events);
                }
            } catch (error) {
                console.log(error.response);
            }
        } else {
            getEvents();
        }
    }

    const filterEvents = async () => {
        await searchEvents(); // Ensure the search is performed first

        if (category !== 'All') {
        setAllEvents(prevEvents => prevEvents.filter(event => event.category === category));
        }
    }

    const toggleModal = () => {
        if( signedIn ) {
            setOpenModal({ isShown: true, type: 'create', data: null});
        } else {
            setError('You must be signed in to create an event');
            setTimeout(()=>{setError('')},3000);
        }
    }

    useEffect(()=>{
        getEvents();
    },[])

    useEffect(()=>{
        filterEvents();
    },[category]);

  return (
    <div className='relative pt-25 sm:pt-0 min-h-screen'>
        {error && <p>{error}</p> }
        <div className='flex flex-row justify-between w-7/10 sm:justify-between items-center h-auto py-5'>

            <h2 className='hidden sm:block text-3xl sm:ml-5 font-montserrat font-medium'>Events</h2>

            <div className='flex items-center justify-between w-100 md:w-150 border-2 rounded-3xl'>
                
                <input type="text" className='outline-none w-4/5 md:w-6/7 my-1 pl-5' placeholder='Search...' value={searchTerm} onChange={({target})=>setSearchTerm(target.value)}/>

                <div className='flex items-center justify-end w-1/5'>
                    {searchTerm && <button className='mr-2 cursor-pointer' onClick={()=>setSearchTerm('')}><MdClose /></button>}
                    <button className='cursor-pointer transition-opacity duration-200 rounded-full opacity-50 hover:opacity-100 p-1' onClick={searchEvents}><FaSearch /></button>
                </div>

                <select name="category" id="cat" className={`w-20 h-auto sm:w-30 outline-none cursor-pointer ${categoryColors[category]} border-3 rounded-r-3xl ml-2 px-2 py-1`} value={category} onChange={({target})=>setCategory(target.value)}>
                    <option value="All" className='' defaultValue={true}>All</option>
                    <option value="Religious" className=''>Religious</option>
                    <option value="Social" className=''>Social</option>
                    <option value="Charity" className=''>Charity</option>
                    <option value="Festival" className=''>Festival</option>
                    <option value="Fest" className=''>Fest</option>
                    <option value="Workshop" className=''>Workshop</option>
                    <option value="Others" className=''>Others</option>
                </select>

            </div>

        </div>

        <div className='container mx-auto p-2 sm:p-15'>
            <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 gap-20'>

            {allEvents.map((item, index) => (

                <EventCard
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    description={item.description}
                    date={item.date}
                    category={item.category}
                    location={item.location}
                />

                ))
            }
            </div>
        </div>

        <Modal
            isOpen={openModal.isShown}
            onRequestClose={()=>{}}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0,0,0,0.5)' },
                }}
            className='w-[40%] max-h-3/5 mx-auto mt-20 bg-slate-300 rounded-3xl'
            ariaHideApp={false}
            >

            <CreateEvent setOpenModal={setOpenModal} getEvents={getEvents}/>
        </Modal>

        <button 
            className='absolute fixed cursor-pointer text-black font-medium right-10 bottom-10 text-5xl rounded-2xl bg-orange-200 flex items-start justify-evenly h-15 w-15 hover:bg-orange-300 transition duration-300 ease-in-out hover:rotate-180 hover:scale-120'
            onClick={toggleModal}
            >+</button>


    </div>
  )
}

export default EventsListing