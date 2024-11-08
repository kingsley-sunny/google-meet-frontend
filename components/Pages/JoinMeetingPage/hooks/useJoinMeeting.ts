import { useRouter } from "next/router";

import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { WsContext } from "../../../../base/Contexts/IoContext/ioContext";
import { useAuth } from "../../../../base/store/authStore/authStore";
import { AnyFunctionType } from "../../../../base/types/types";

export const useJoinMeetingWebsocket = (onAccepted?: AnyFunctionType) => {
  const router = useRouter();
  const { setAuthToken, setUser, user, setMeetingToken } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const socket = useContext(WsContext);
  const meetingId = router.query.meetingCode;

  useEffect(() => {
    // check if the user approve the socket
  }, [socket, meetingId]);

  const handleJoinMeeting = (data: any, onAccepted?: AnyFunctionType) => {
    if (!data.name && !user) {
      toast.error("Your name is required!");
      return;
    }

    if (socket) socket.emit("/meeting-request/create", data);
    setIsLoading(true);

    if (socket) {
      socket.on(`/meeting-request/${meetingId}/update`, data => {
        setIsLoading(false);
        if (data.data.accepted) {
          setMeetingToken(data.data.meetingToken);

          if (onAccepted) {
            onAccepted(data.data);
          }

          return toast.success("Your meeting request have been accepted ");
        }

        return toast.error("You meeting request have been rejected");
      });
    }

    // post(data, {
    //   onError(error) {
    //     toast.error(error.message);
    //   },
    //   onSuccess(data) {
    //     console.log(data);
    //     socket.emit("meeting-request", { meeting: data.data.meeting_id, details: data.data });
    //   },
    // });
  };

  return { handleJoinMeeting, isLoading };
};
