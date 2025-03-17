import { createContext, useState } from "react";
import Modal from "react-modal";

export const AppContext = createContext();

// Create Provider Component
export const AppProvider = ({ children }) => {

  const [ user, setUser ] = useState({ fullName: "", email: ""});
  const [ signedIn, setSignedIn ] = useState(false);
  const [ isSigning, setIsSigning ] = useState(false);

  const categoryColors = {     
    All: "border-transparent",
    Religious: "border-[#726DA8]",  // Muted Lavender (Elegant)
    Social: "border-[#5D9DDA]",     // Soft Blue (Friendly)
    Charity: "border-[#6D9773]",    // Muted Green (Trustworthy)
    Festival: "border-[#E1A95F]",   // Warm Golden (Celebratory)
    Fest: "border-[#D17B88]",       // Soft Coral Pink (Festive)
    Workshop: "border-[#8D6CAB]",   // Muted Purple (Creative)
    Others: "border-[#908D94]"      // Muted Gray (Neutral)
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
