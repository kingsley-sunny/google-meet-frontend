import socketIO from "socket.io-client";
export const socket = socketIO(process.env.NEXT_PUBLIC_API_URL);
console.log("🚀 ~~ socket:", socket.id);
