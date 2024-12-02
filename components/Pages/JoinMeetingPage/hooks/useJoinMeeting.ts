import { useRouter } from "next/router";

import { useContext, useState } from "react";
import { toast } from "sonner";
import { PeerContext } from "../../../../base/Contexts/PeerContext/PeerContext";
import { WsContext } from "../../../../base/Contexts/wsContext/WsContext";
import { ISocketMeetingUser } from "../../../../base/interfaces/IProps";
import { useAuth } from "../../../../base/store/authStore/authStore";
import { AnyFunctionType } from "../../../../base/types/types";

export const useJoinMeetingWebsocket = (onAccepted?: AnyFunctionType) => {
  const router = useRouter();
  const { setAuthToken, setUser, user, setMeetingToken, setTempUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const socket = useContext(WsContext);
  const { peer } = useContext(PeerContext);
  const meetingId = router.query.meetingCode;

  const handleJoinMeeting = (data: any, onAcceptedInFunction?: AnyFunctionType) => {
    if (!data.name && !user) {
      toast.error("Your name is required!");
      return;
    }

    const formattedData: ISocketMeetingUser = {
      ...data,
      peer_id: peer?.id,
      socket_id: socket?.id,
      meeting_id: meetingId,
      pic_url: user?.pic_url,
      name: data.name || user?.name,
    };

    if (!user) {
      setTempUser(data.name);
    }

    if (socket) socket.emit("/meeting-request/create", formattedData);
    setIsLoading(true);

    if (socket) {
      socket.on(`/meeting-request/${meetingId}/update`, data => {
        setIsLoading(false);
        if (data.data.accepted) {
          setMeetingToken(data.data.meetingToken);

          if (onAccepted) {
            onAccepted(data.data);
          }

          peer?.on("call", connection => {
            alert("on Call");

            console.log(connection);
          });

          if (onAcceptedInFunction) {
            onAcceptedInFunction(data.data);
          }

          return toast.success("Your meeting request have been accepted ");
        }

        return toast.error("You meeting request have been rejected");
      });
    }
  };

  return { handleJoinMeeting, isLoading };
};
