import { useEffect } from "react";
import socket from "../../services/socket";

const SocketInitializer = () => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    console.log("Stored User:", user);

    if (user?.id) {
      socket.connect();

      socket.emit("join-user-room", user.id);

      console.log("Joined Room:", user.id);
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
};

export default SocketInitializer;
