import React, { useContext } from "react";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";

const EventCard = ({ id, title, description, date, category, location }) => {

  const { categoryColors } = useContext(AppContext);
  const navigate = useNavigate();

  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  return (
    <div
      className={`relative flex flex-col justify-between p-6 w-full sm:w-64 h-80 rounded-2xl 
      transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer 
      border-2 shadow-md 
      animate-fadeInUp 
      ${categoryColors[category]?.border || "border-gray-300"} 
      ${categoryColors[category]?.bg || "bg-[#F5F1E3]"}`}
      onClick={() => navigate(`/events/${id}`)}

    >
      {/* Date & Location */}
      <div className="flex justify-between text-sm text-gray-700">
        <span className="font-medium">{formattedDate}</span>
        <span className="font-medium text-right">{location}</span>
      </div>


      {/* Event Title */}
      <h3 className="text-lg font-bold mt-2">{title}</h3>

      {/* Description */}
      <p className="text-gray-800 text-sm mt-2 line-clamp-3 pb-6">
        {/* Added padding-bottom */}
        {description}
      </p>


      {/* Category Badge */}
      <div className="absolute bottom-3 left-4 flex items-center">
        <span
          className={`px-3 py-1 text-xs font-bold text-white uppercase rounded-full shadow-sm
          ${categoryColors[category]?.bg || "bg-gray-500"}`}
        >
          {category}
        </span>
      </div>

      
    </div>
  );
};

export default EventCard;