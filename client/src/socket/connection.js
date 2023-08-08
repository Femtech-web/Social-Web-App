import { io } from 'socket.io-client';

const userId = JSON.parse(localStorage.getItem('user'))?.result?._id;
const SERVER_URL = import.meta.env.VITE_SOCKET_URL;

export const socket = io(SERVER_URL, {
    auth: {
        userId
    }
});
