import { useContext } from "react";
import { SocketContext, SocketContextType } from "./SocketContext";

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  console.log("🚀 ~~ useSocket ~~ context:", context);

  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
