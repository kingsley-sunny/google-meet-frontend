import Peer from "peerjs";
import { createContext } from "react";
import { AnyFunctionType } from "../../types/types";

export const PeerContext = createContext<{ peer: Peer | undefined; onOpen?: AnyFunctionType }>({
  peer: undefined,
});
