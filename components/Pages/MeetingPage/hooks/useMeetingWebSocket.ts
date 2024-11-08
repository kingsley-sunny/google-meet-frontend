import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { WsContext } from "../../../../base/Contexts/wsContext/WsContext";
import { useAuth } from "../../../../base/store/authStore/authStore";

export const useMeetingRequestsWebSocket = () => {
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const meetingCode = router.query.meetingCode;
  const [meetingRequests, setMeetingRequests] = useState<any[]>([]);

  // const socket = useSocket();
  const socket = useContext(WsContext);

useEffect(() => {
  if (user && meetingCode && socket) {
      // CREATE A MEETING REQUEST
      socket.on(`/meeting-request/${meetingCode}/${user?.id}/create`, data => {
        setIsApprovalModalOpen(true);
      });
    }

    if (socket) {
      // GET ALL THE USERS IN A MEETING REQUEST
      socket.on(`/meeting-request/${meetingCode}/${user?.id}/get`, data => {
        setMeetingRequests(data.data?.requests);
      });

      if (isApprovalModalOpen) {
        // GET ALL THE MEETING REQUESTS
        socket.emit("/meeting-requests/get", { meeting_id: meetingCode });
      }
    }
  }, [socket, isApprovalModalOpen, meetingCode]);

  const handleRequest = (socketId: string, action: "accept" | "reject") => {
    socket?.emit(`/meeting-requests/update`, {
      meeting_id: meetingCode,
      socket_id: socketId,
      action: action,
    });
  };

  return { isApprovalModalOpen, setIsApprovalModalOpen, meetingRequests, handleRequest };
};
