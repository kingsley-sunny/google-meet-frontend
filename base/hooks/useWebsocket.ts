import { useAtom } from "jotai";
import { DefaultEventsMap, Socket } from "socket.io";
import { io } from "socket.io-client";
import { useAuth } from "../store/authStore/authStore";
import { webSocketAtom } from "./atom";
import { useEffectOnce } from "./useEffectOnce";

type SocketEventHandler = (socket?: Socket<DefaultEventsMap, DefaultEventsMap>) => void;

/**
 * Initializes and returns a WebSocket instance.
 *
 * @returns An object containing the WebSocket instance.
 */

export const useWebSocket = () => {
  const { accessToken, meetingToken } = useAuth();
  const [socket, setSocket] = useAtom(webSocketAtom);

  useEffectOnce(() => {
    console.log("useEffectOne", "This effect is rendered");
    if (!socket) {
      initialize();
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  });

  const initialize = async () => {
    if (!socket) {
      const appSocket = io(process.env.NEXT_PUBLIC_API_URL, {
        extraHeaders: {
          authorization: `Bearer ${accessToken}`,
          meetingToken: meetingToken,
        },
      });
      setSocket(appSocket as any);
      socketLifeCircleHooks(appSocket as any);
    }
  };

  const socketLifeCircleHooks: SocketEventHandler = (appSocket: any) => {
    appSocket.on("connect", () => {
      console.info(`Websocket ${appSocket.id} connected successfully`);
    });

    appSocket.on("disconnect", () => {
      console.warn(`Websocket ${appSocket.id} disconnected successfully`);
    });
  };

  return { socket };
};
