import { atom } from "jotai";
import { DefaultEventsMap } from "socket.io";
import { Socket } from "socket.io-client";

export const webSocketAtom = atom<Socket<DefaultEventsMap, DefaultEventsMap> | undefined>(
  undefined
);
