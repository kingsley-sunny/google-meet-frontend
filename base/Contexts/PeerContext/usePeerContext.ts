import Peer from "peerjs";
import { useState } from "react";
import { useEffectOnce } from "../../hooks/useEffectOnce";

export const usePeerjs = () => {
  const [peer, setPeer] = useState<Peer>();

  useEffectOnce(() => {
    const peerConnection = new Peer({
      host: process.env.NEXT_PUBLIC_PEERJS_HOST as string,
      port: Number(process.env.NEXT_PUBLIC_PEERJS_PORT) as number,
      path: "/signal-peer",
    });

    if (peerConnection) {
      setPeer(peerConnection);
    }

    return () => {
      peerConnection.disconnect();
    };
  });
  return { peer, setPeer };
};
