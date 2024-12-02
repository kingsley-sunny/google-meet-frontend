import Peer, { MediaConnection } from "peerjs";
import { useState } from "react";
import { useEffectOnce } from "../../hooks/useEffectOnce";

export const usePeerjs = ({
  onOpen,
  onCall,
}: {
  onOpen?: (id: string) => void;
  onCall?: (connection: MediaConnection) => void;
}) => {
  const [peer, setPeer] = useState<Peer>();

  useEffectOnce(() => {
    const peerConnection = new Peer({
      host: process.env.NEXT_PUBLIC_PEERJS_HOST as string,
      port: Number(process.env.NEXT_PUBLIC_PEERJS_PORT) as number,
      path: "/signal-peer",
    });

    if (peerConnection) {
      setPeer(peerConnection);

      peerConnection.on("open", id => {
        if (onOpen) {
          onOpen(id);
        }
      });

      peerConnection.on("call", connection => {
        // alert("A call is coming");

        if (onCall) {
          onCall(connection);
        }
      });
    }

    return () => {
      peerConnection.disconnect();
    };
  });
  return { peer, setPeer };
};
