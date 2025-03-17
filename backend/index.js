require('dotenv').config();

const express = require('express');
const cors = require('cors');

const config = require('./config.json')
const mongoose = require('mongoose');

mongoose.connect(config.connectionString);

const User = require('./models/user-model');
const Event = require('./models/event-model');

const app = express();

const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./utilities');

app.use(express.json());
app.use(cors({
    origin: "*",
    }));


app.get('/', ( req,res ) => {
    res.json({ data: "Hello, World!" });
})


// Create Account
app.post('/register', async ( req,res ) => {
    const { fullName, email, password } = req.body;

    if (!fullName) return res.status(400).json({ error: true, message: "Full name is required" });
    if (!email) return res.status(400).json({ error: true, message: "Email is required" });
    if (!password) return res.status(400).json({ error: true, message: "Password is required" });

    const isUser = await User.findOne({ email: email });

    if(isUser) return res.status(400).json({ error: true, message: "Email already exists" });

    const user = new User({
        fullName,
        email,
        password
    });

    await user.save()

    const accessToken = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "10080m"});

    return res.json({
        error: false,
        message: "Registration Successful",
        fullName: user.fullName,
        accessToken
    })

});

// Login
app.post('/login', async ( req,res ) => {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ error: true, message: "Please enter a valid email address " });
    if (!password) return res.status(400).json({ error: true, message: "Please enter a password " });

    const user = await User.findOne({ email: email });

    if(!user) return res.status(400).json({ error: true, message: "You haven't registered yet."})

    if ( user.password !== password ) return res.status(400).json({ error: true, message: "Password is Incorrect"});
    const accessToken = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "10080m"});
    return res.json({
        error: false,
        message: "Login Successful",
        fullName: user.fullName,
        accessToken,
    });
});

// Get User Information
app.get('/get-user', authenticateToken, async ( req, res ) => {
    const { user } = req.user;

    const isUser = await User.findOne({ _id: user._id });

    if (!isUser) {
        return res.status(400).json({ message: "User not found" });
    }

    return res.json({
        user: {
            _id: isUser._id,
            fullName: isUser.fullName,
            email: isUser.email,
        },
        message: "",
    });
}) 

// Create Event
app.post('/create-event', authenticateToken, async ( req, res ) => {
    const { title, description, date, category, location } = req.body;
    const { user } = req.user;

    if ( !title || !description || !date || !category || !location ) {
        return res.status(400).json({ error: true, message: "Missing necessary details, please fill" });
    }

    try {
        const newEvent = new Event({
            title, 
            description, 
            category, 
            date, 
            location,
            userId: user._id
        });
    
        await newEvent.save();

        return res.json({ error: false, message: 'Event created successfully' });
    } catch ( error ) {
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error',
            userId: user._id,
        });
    }
});

// Update Event
app.put('/update-event/:eventId', authenticateToken, async ( req, res ) => {
    const eventId = req.params.eventId;
    const { title, description, date, category, location } = req.body;
    const { user } = req.user;

    if ( !title || !description || !date || !category || !location ) {
        return res.status(400).json({ error: true, message: "Missing necessary details, please fill" });
    }
    try {
        const newEvent = await Event.findById(eventId);

        if(!newEvent) return res.status(404).json({ error: true, message: "Event not found" });

        newEvent.title = title;
        newEvent.description = description;
        newEvent.date = date;
        newEvent.category = category;
        newEvent.location = location;
    
        await newEvent.save();

        return res.json({ error: false, message: 'Event updated successfully' });
    } catch ( error ) {
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error',
            userId: user._id,
        });
    }
});

// Delete Event
app.delete('/delete-event/:eventId', authenticateToken, async ( req, res ) => {
    const eventId = req.params.eventId;
    const { user } = req.user;

    try {
        const newEvent = await Event.findById(eventId);

        if(!newEvent) return res.status(404).json({ error: true, message: "Event not found" });
    
        await newEvent.deleteOne();

        return res.json({ error: false, message: 'Event Deleted successfully' });
    } catch ( error ) {
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error',
            userId: user._id,
        });
    }
});

// Get Event
app.get('/fetch-event/:eventId', async ( req, res ) => {
    const eventId = req.params.eventId;
    
    const newEvent = await Event.findById(eventId);

    if (!newEvent) return res.status(404).json({ error: true, message: "Event not found" });

    try{

        return res.json({ error: false, event: newEvent });

    } catch (error) {
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    } 
});

// Get all Events
app.get('/get-events', async ( req, res ) => {
    try{
        const events = await Event.find();

        return res.json({
            error: false,
            events,
            message: 'All events retrieved successfully',
        });

    } catch (error) {
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    } 
});

// Get User Events
app.get('/get-user-events', authenticateToken, async ( req, res ) => {
    const { user } = req.user;

    try{
        const events = await Event.find({ userId: user._id });

        return res.json({
            error: false,
            events,
            message: 'All events retrieved successfully',
        });

    } catch (error) {
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    } 
});

// Search Events 
app.get('/search-events', async ( req, res ) => {
    const { searchTerm } = req.query;

    try{
        const matchingEvents = await Event.find({
            $or: [
                { title: { $regex: new RegExp(searchTerm, 'i' ) } },
                { description: { $regex: new RegExp(searchTerm, 'i' ) } },
                { location: { $regex: new RegExp(searchTerm, 'i' ) } }
                ],
        });

        return res.json({
            error: false,
            events: matchingEvents,
            message: 'Searching Events',
        });

    } catch (error) {
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    } 
});

app.listen(8000);

module.exports = app;