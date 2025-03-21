import { createContext, useState } from "react";
import axiosInstance from "./utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

export const AppContext = createContext();

// Create Provider Component
export const AppProvider = ({ children }) => {

  const [ user, setUser ] = useState({ fullName: "", email: ""});
  const [ signedIn, setSignedIn ] = useState(false);
  const [ isSigning, setIsSigning ] = useState(false);

  const categoryColors = {
    All: { border: "border-transparent", bg: "bg-transparent" },
    Religious: { border: "border-[#726DA8]", bg: "bg-[#726DA8]" }, // Muted Lavender (Elegant)
    Social: { border: "border-[#5D9DDA]", bg: "bg-[#5D9DDA]" }, // Soft Blue (Friendly)
    Charity: { border: "border-[#6D9773]", bg: "bg-[#6D9773]" }, // Muted Green (Trustworthy)
    Festival: { border: "border-[#E1A95F]", bg: "bg-[#E1A95F]" }, // Warm Golden (Celebratory)
    Fest: { border: "border-[#D17B88]", bg: "bg-[#D17B88]" }, // Soft Coral Pink (Festive)
    Workshop: { border: "border-[#8D6CAB]", bg: "bg-[#8D6CAB]" }, // Muted Purple (Creative)
    Others: { border: "border-[#908D94]", bg: "bg-[#908D94]" }, // Muted Gray (Neutral)
  };

  const [ openModal, setOpenModal ] = useState({
          isShown: false,
          type: 'view',
          data: null
      });

  const handleLogout = () => {
    localStorage.clear();
    setSignedIn(false);
  }

  const getUserInfo = async () => {
    try {
        const response = await axiosInstance.get('/get-user');
        if ( response.data && response.data.user ) {
        setUser({ fullName: response.data.user.fullName, email: response.data.user.email });
        setSignedIn(true);
        } 
    } catch (error) {
        console.log(error)
    }
};

  return (
    <AppContext.Provider value={{ user, setUser, signedIn, setSignedIn, isSigning, setIsSigning, categoryColors, openModal, setOpenModal, handleLogout, getUserInfo }}>
      {children}
    </AppContext.Provider>
  );
};
