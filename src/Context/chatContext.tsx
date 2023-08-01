import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ChatProviderProps {
  children: ReactNode;
}

const ChatContext = createContext<any>(null);

const ChatProvider = ({ children }: ChatProviderProps) => {
  const [user,setUser] = useState();

  useEffect(()=>{
    // const userInfo = JSON.parse(localStorage)
  },[])
  return (
  <ChatContext.Provider value={{user,setUser}}>
    {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () =>{
  return useContext(ChatContext);
}

export default ChatProvider;
