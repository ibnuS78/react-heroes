import { ReactNode, createContext, useCallback, useContext, useState } from "react";

type MessageContextType = {
    messages: string[];
    addMessage: (message: string) => void;
    clearMessages: () => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

const MessageProvider = ({children}: {children: ReactNode}) => {
    const [messages, setMessages] = useState<string[]>([]);

    const addMessage =  useCallback((message: string) => {
        setMessages(prevMessages => [...prevMessages, message])
    }, [])

    const clearMessages = () => {
        setMessages([]);
    }

    return (
        <MessageContext.Provider value={{messages, addMessage, clearMessages}}>
            {children}
        </MessageContext.Provider>
    )
}

const useMessages = () => {
    const context = useContext(MessageContext);

    if(context === undefined){
        throw new Error('useMessage must be used within a Message Provider')
    }

    return context;
}

export{MessageProvider, useMessages}