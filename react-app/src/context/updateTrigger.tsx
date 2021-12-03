import { createContext, useContext, useState } from 'react';

export const UpdateTriggerContext = createContext(null);

export const useUpdateTrigger = () => useContext(UpdateTriggerContext);

interface ModalProviderProps{
    children:any
}
  

export default function UpdateTriggerProvider({ children }:ModalProviderProps) {
    const [updateTrigger, setUpdateTrigger] = useState("");
    let value:any = {
        updateTrigger,
        setUpdateTrigger
    }
    return (
        <UpdateTriggerContext.Provider
        value={value}
        >
        {children}
        </UpdateTriggerContext.Provider>
    );
}