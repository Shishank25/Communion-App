import { createContext, useState } from "react";
import Modal from "react-modal";

export const AppContext = createContext();

// Create Provider Component
export const AppProvider = ({ children }) => {

  const [ user, setUser ] = useState({ fullName: "", email: ""});
  const [ signedIn, setSignedIn ] = useState(false);
  const [ isSigning, setIsSigning ] = useState(false);

  const categoryColors = {     
          Religious: "border-indigo-700",  
          Social: "border-blue-500",       
          Charity: "border-green-600",     
          Festival: "border-yellow-500",   
          Fest: "border-pink-500",        
          Workshop: "border-purple-600",   
          Others: "border-gray-500"      
        };

  const [ openModal, setOpenModal ] = useState({
          isShown: false,
          type: 'view',
          data: null
      })

  return (
    <AppContext.Provider value={{ user, setUser, signedIn, setSignedIn, isSigning, setIsSigning, categoryColors, openModal, setOpenModal }}>
      {children}
    </AppContext.Provider>
  );
};
