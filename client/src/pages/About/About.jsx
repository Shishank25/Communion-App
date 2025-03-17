import React from 'react'

const About = () => {
  return (
    <div className='mt-12'>

      <section className="text-center animate-fade-in min-h-screen py-12 bg-transparent mx-auto w-3/4">
        <p className="mt-4 text-xl my-10 italic text-black render">
          "Communion App is a platform designed to bring people together through meaningful events. 
          Whether you're looking for social gatherings, religious meetups, charity drives, or festivals, 
          Communion makes it easy to discover, join, and create events that matter to you."
        </p>


        <h2 className='text-3xl font-bold my-10'>Why this app exists?</h2>
        <p className="mt-4 text-xl text-black render">
          Our mission is simple: to foster stronger communities by making event participation effortless. 
          In today's fast-paced world, staying connected is more important than ever. 
          We aim to provide a space where people can engage with their communities, celebrate traditions, 
          support charitable causes, and build meaningful relationships.
        </p>


        <p className='mt-20 text-xl text-black render'>
          Here at CommunionHub we're a community of communities. Please if you have any feedbacks 
          or reports, kindly send them at <i>shishankshakher@gmail.com</i><br/>If it is about any 
          event please include the url. <br/>We are always here to help you.
        </p>
      </section>
    </div>
  )
}

export default About