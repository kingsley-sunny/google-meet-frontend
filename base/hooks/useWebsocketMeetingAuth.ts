import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { PeerContext } from "../Contexts/PeerContext/PeerContext";
import { WsContext } from "../Contexts/wsContext/WsContext";
import { useAuth } from "../store/authStore/authStore";
import { AnyFunctionType } from "../types/types";

export const useWebsocketMeetingAuth = ({
  onSuccess,
  onError,
}: {
  onSuccess?: AnyFunctionType;
  onError?: AnyFunctionType;
}) => {
  // render a loading page,
  const [isLoading, setIsLoading] = useState(true);

  const socket = useContext(WsContext);
  const peer = useContext(PeerContext);
  const { meetingToken, user } = useAuth();
  const router = useRouter();
  const meetingId = router.query.meetingCode;

  


  useEffect(() => {
    peer?.on("close", () => {
      alert("close");
    });

    peer?.on("disconnected", () => {
      alert("disconnected");
    });

    peer?.on("open", id => {
      if (socket && meetingToken) {
        socket?.emit(`/meeting/join`, {
          meeting_token: meetingToken,
          user_id: user?.id,
          peer_id: id,
        });

        console.log("emitted socket");

        socket.on(`/meeting/${socket.id}/join`, data => {
          console.log("🚀 ~~ on call room:", data);
          if (data.data?.accepted) {
            if (onSuccess) {
              onSuccess(data, peer);
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
            if (onError) {
              console.log("🚀 ~~ useEffect ~~ data:", data);
              onError(data.message);
            }
          }
        });
      } else {
        if (onError) onError("Something went wrong");
      }
    });

    return () => {};
  }, [socket, peer, meetingToken]);

  // send a webosocket event with the meeting token, peerId and the userId, to check if the user has been accepted or is the owner of the meeting token ==> THis is return the users in the room

  // call those users

  // answer the users
  return { isLoading, peer };
};
