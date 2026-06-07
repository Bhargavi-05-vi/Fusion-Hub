import { io } from "socket.io-client";

const socket = io(
  import.meta.env.VITE_API_URL || "http://localhost:5000",
  {
    autoConnect: false,
    withCredentials: true,
  }
);

socket.on("connect", () => {
  console.log("✅ Socket Connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Socket Disconnected");
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket Error:", err.message);
});

export default socket;
