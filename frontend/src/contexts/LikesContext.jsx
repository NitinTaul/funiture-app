import { createContext, useContext, useState } from "react";

const LikesContext = createContext();

export const LikesProvider = ({ children }) => {
  const [likesCount, setLikesCount] = useState(0);

  const addToLikes = (item) => {
    setLikesCount((prev) => prev + 1);
  };

  return (
    <LikesContext.Provider value={{ likesCount, addToLikes }}>
      {children}
    </LikesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLikes = () => useContext(LikesContext);
