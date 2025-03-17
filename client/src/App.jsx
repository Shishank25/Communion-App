import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import EventsListing from './pages/EventsListing/EventsListing'
import About from './pages/About/About'
import UserProfile from './pages/UserProfile/UserProfile';
import EventPage from './pages/EventPage/EventPage';

function App() {

  return (
      <div className='relative overflow-hidden flex flex-col'>
        
          <Routes>
            <Route path='/' element={ <Home /> }/>
            <Route path='/events' element={ <EventsListing /> } />
            <Route path='/about' element={ <About /> } />
            <Route path='/your-profile' element={ <UserProfile /> } />
            <Route path='/events/:eventId' element={ <EventPage /> } />
          </Routes>
          <div className='md:hidden absolute top-50 right-0 w-150 h-150 rounded-full mix-blend-multiply filter blur-xl animate-blob opacity-60 -z-2' 
              style={{ backgroundColor: '#FFC0D9' }}>
          </div>

          <div className='md:hidden absolute top-0 -left-50 w-200 h-200 rounded-full mix-blend-multiply filter blur-xl animate-blob opacity-60 -z-2' 
              style={{ backgroundColor: '#FB88B4' }}>
          </div>
      </div>
  )
}

export default App
