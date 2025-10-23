import React, { useEffect, useRef, ReactNode, createContext } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import io, { Socket } from 'socket.io-client';
import { SOCKET_DEV } from '../network/NetworkRequest';

interface SocketContextProps {
    socket: Socket | null;
    closeSocket: () => void
}

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketContextProvider = createContext<SocketContextProps>({ socket: null, closeSocket: () => { } });

const connectionConfig = {
    // jsonp: false,
    reconnection: true,
    reconnectionDelay: 10000,
    reconnectionAttempts: 10,
    transports: ['websocket'],
};

export const SocketProviderContext: React.FC<SocketProviderProps> = ({ children }) => {
    const env = SOCKET_DEV;
    const socket = useRef<Socket>(io(env, connectionConfig));
    const appState = useRef(AppState.currentState);

    const closeSocket = () => {
        if (socket.current) {
            socket.current.removeAllListeners();
            socket.current.close();
        }
    }

    useEffect(() => {
        const currentSocket = socket.current;
        currentSocket.on('connect', () => {
        });

        currentSocket.on('disconnect', (msg) => {
            console.log('SocketIO: Disconnect', msg);
            socket.current = io(env, connectionConfig);
        });

        const handleAppStateChange = (nextAppState: AppStateStatus) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                if (!socket?.current?.connected) {
                    socket?.current?.connect()
                }
            } else if (nextAppState.match(/inactive/)) {
                // closeSocket();
            }
            appState.current = nextAppState;
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => {
            closeSocket();
            subscription.remove();
            // AppState.addEventListener('change', handleAppStateChange);
        };
    }, [env]);

    return (
        <SocketContextProvider.Provider value={{ socket: socket.current, closeSocket }}>
            {children}
        </SocketContextProvider.Provider>
    );
};
