import React, { useState, useContext } from "react";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { AppContext } from "../../AppContext";

const CreateEvent = ({ event, getEvents }) => {
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [date, setDate] = useState("");
  const [toDate, setToDate] = useState('');
  const [isSingleDay, setIsSingleDay] = useState(true); 
  const [category, setCategory] = useState(event?.category || "");
  const [location, setLocation] = useState(event?.location || "");
  const [error, setError] = useState("");

  const { openModal, setOpenModal } = useContext(AppContext);

  const handleEventCreation = async () => {
    if (!title) return setError("Please give your event a title");
    if (!description) return setError("Please describe your event");
    if (!date) return setError("Please set a date and time");
    if (!category) return setError("Select a category for the event");
    if (isSingleDay) setToDate(date);

    try {
      if (openModal.type === "create") {
        const response = await axiosInstance.post("/create-event", {
          title,
          description,
          date,
          toDate,
          category,
          location,
        });
        if (!response.data.error)
          setOpenModal({ isShown: false, type: "", data: null });
      } else if (openModal.type === "edit") {
        const response = await axiosInstance.put(`/update-event/${event.id}`, {
          title,
          description,
          date,
          toDate,
          category,
          location,
        });
        if (!response.data.error)
          setOpenModal({ isShown: false, type: "", data: null });
      }
      getEvents();
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred");
    }
  };

  const deleteEvent = async () => {
    try {
      const response = await axiosInstance.delete(`/delete-event/${event.id}`);
      if (!response.data.error) {
        setOpenModal({ isShown: false, type: "", data: null });
        getEvents();
      }
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred");
    }
  };

  return (
    <>
      {/* Background Overlay with Blur */}
      <div className="fixed inset-0 bg-opacity-20 backdrop-blur-md z-40"></div>

      {/* Modal */}
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="relative w-full max-w-lg bg-[#f5e6d7] p-8 rounded-xl shadow-xl border border-[#e0c3a0]">

          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
            onClick={() =>
              setOpenModal({ isShown: false, type: "", data: null })
            }
          >
            <MdClose size={24} />
          </button>


          <h2 className="text-2xl font-semibold text-center text-[#5a4a3c] mb-4">
            {openModal.type === "edit" ? "Edit Event" : "Create Event"}
          </h2>

          {/* Form */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-[#d3b28c] rounded-lg bg-[#fff9f3] text-[#5a4a3c] focus:ring-2 focus:ring-[#d3b28c]"
            />

            <textarea
              placeholder="Describe the event... (include timing details)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-[#d3b28c] rounded-lg bg-[#fff9f3] text-[#5a4a3c] focus:ring-2 focus:ring-[#d3b28c]"
            ></textarea>

            <div className="flex gap-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-1/2 px-4 py-2 border border-[#d3b28c] rounded-lg bg-[#fff9f3] text-[#5a4a3c] focus:ring-2 focus:ring-[#d3b28c]"
              >
                <option value="">Select Category</option>
                <option value="Religious">Religious</option>
                <option value="Social">Social</option>
                <option value="Charity">Charity</option>
                <option value="Festival">Festival</option>
                <option value="Fest">Fest</option>
                <option value="Workshop">Workshop</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-1/2 px-4 py-2 border border-[#d3b28c] rounded-lg bg-[#fff9f3] text-[#5a4a3c] focus:ring-2 focus:ring-[#d3b28c]"
              />
            </div>

              {/* Dates */}
            <div className="flex justify-between items-center">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-1/3 px-4 py-2 border border-[#d3b28c] rounded-lg bg-[#fff9f3] text-[#5a4a3c] focus:ring-2 focus:ring-[#d3b28c]"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className={`w-1/3 px-4 py-2 border border-[#d3b28c] rounded-lg bg-[#fff9f3] text-[#5a4a3c] focus:ring-2 focus:ring-[#d3b28c]
                  transition-opacity duration-500 ${isSingleDay === true ? 'opacity-0' : 'opacity-100'} `}
                disabled={isSingleDay}
              />
              <label htmlFor="" className="text-xs">Sinlge-day event?</label>
              <input type="checkbox" 
                value={isSingleDay}
                onChange={(e) => setIsSingleDay(prev => !prev)}
                className="cursor-pointer"
                checked={isSingleDay}/>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Buttons */}
            <div className="flex flex-col items-center mt-4 space-y-3">
              <button
                onClick={handleEventCreation}
                className="w-2/3 bg-[#d3b28c] text-white px-6 py-2 rounded-lg hover:bg-[#c0a07a] transition cursor-pointer"
              >
                {openModal.type === "edit" ? "Update Event" : "Create Event"}
              </button>
              {openModal.type === "edit" && (
                <button
                  onClick={deleteEvent}
                  className="w-2/3 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEvent;