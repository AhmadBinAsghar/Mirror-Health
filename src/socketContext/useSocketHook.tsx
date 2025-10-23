import { useContext } from "react";
import { SocketContextProvider } from "./socketContextProviders";

const useSocketHook = () => {
    const context = useContext(SocketContextProvider);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

export default useSocketHook;