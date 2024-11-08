import { createContext } from "react";
import { DefaultEventsMap } from "socket.io";
import { Socket } from "socket.io-client";

export const WsContext = createContext<Socket<DefaultEventsMap, DefaultEventsMap> | undefined>(undefined);
