import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { AppContext } from "../../AppContext";
import { useParams } from "react-router-dom";

const EventPage = () => {

    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);
    const { categoryColors } = useContext(AppContext);

    useEffect(() => {
    const fetchEvent = async () => {
        try {
        const response = await axiosInstance.get(`/fetch-event/${eventId}`);
        if (response.data && response.data.event) {
            setEvent(response.data.event);
            setError(null);
        } else {
            setError("Sorry, unable to find this event.");
        }
        } catch (error) {
        setError("Sorry, unable to find this event.");
        }
    };
    fetchEvent();
    }, [eventId]);

    if (error) {
    return <p className="text-red-600 font-semibold">{error}</p>;
    }

    if (!event) {
    return <p className="text-gray-600">Loading event details...</p>;
    }

    // Format the date
    const dateObj = new Date(event.date);
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    });

    // Get category styles, defaulting to "Others" if undefined
    const categoryStyle =
    categoryColors[event.category] || categoryColors["Others"];

    return (
    <div className="flex justify-center items-center min-h-screen px-4">
        <div
        className={`w-full max-w-2xl p-8 rounded-xl shadow-xl border 
                ${categoryStyle.border} ${categoryStyle.bg} animate-fadeInUp`}
        >
        <p className="text-sm font-semibold uppercase text-white px-3 py-1 inline-block rounded-full shadow-md">
            {event.category}
        </p>
        <h1 className="font-montserrat font-bold text-4xl mt-4 text-white">
            {event.title}
        </h1>
        <div className="flex justify-between text-white text-sm mt-3">
            <span>{formattedDate}</span>
            <span>{event.location}</span>
        </div>
        <p className="text-white mt-6 leading-relaxed">{event.description}</p>
        </div>
    </div>
    );
};

export default EventPage;