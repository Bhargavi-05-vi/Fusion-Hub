import { useEffect } from "react";
import socket from "../../services/socket";

const SocketNotifications = () => {
  useEffect(() => {
    socket.on("new-order", (data) => {
      console.log("NEW ORDER:", data);
      alert(`🛒 ${data.message}`);
    });

    socket.on("order-status-updated", (data) => {
      console.log("ORDER UPDATE:", data);
      alert(`📦 Order Status: ${data.status}`);
    });

    socket.on("delivery-assigned", (data) => {
      console.log("DELIVERY:", data);
      alert(`🚚 ${data.message}`);
    });

    return () => {
      socket.off("new-order");
      socket.off("order-status-updated");
      socket.off("delivery-assigned");
    };
  }, []);

  return null;
};

export default SocketNotifications;
