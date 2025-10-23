import { io } from "socket.io-client";
// const url = "http://192.168.1.39:8000";
const url = "http://13.48.111.237:8001";

const socketClient = io(url, {
    transports: ['websocket'],
    reconnection: true,
    // reconnectionAttempts: 100000,
    reconnectionDelay: 10000,
    reconnectionDelayMax: 10000,
});
export default socketClient;
