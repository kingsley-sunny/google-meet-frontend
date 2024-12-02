import { useState } from "react";
import { MediaContext } from "../../base/Contexts/MediaContext/MediaContext";
import { useMediaStream } from "../../base/Contexts/MediaContext/useMediaStream";
import { useJoinMeetingWebsocket } from "../../components/Pages/JoinMeetingPage/hooks/useJoinMeeting";
import { JoinMeetingPage } from "../../components/Pages/JoinMeetingPage/JoinMeetingPage";
import MeetingPage from "../../components/Pages/MeetingPage/MeetingPage";

const Index = () => {
  // render a loading page,
  // send a webosocket event with the meeting token, peerId and the userId, to check if the user has been accepted or is the owner of the meeting token ==> THis is return the users in the room
  // call those users
  // answer the users
  const {
    audioRef,
    isAudioEnabled,
    isVideoOpen,
    mediaStream,
    startMeeting,
    toggleMic,
    toggleVideo,
    videoRef,
    stopMeeting,
    createMediaStream,
    // speechRate,
  } = useMediaStream();
  const [isJoinMeeting, setIsJoinMeeting] = useState(false);
  const [streams, setStreams] = useState<MediaStream[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  console.log("🚀 ~~ Index ~~ users:", users);

  const { handleJoinMeeting, isLoading } = useJoinMeetingWebsocket();

  return (
    <MediaContext.Provider
      value={{
        audioRef,
        isAudioEnabled,
        isVideoOpen,
        startMeeting,
        stopMeeting,
        toggleMic,
        toggleVideo,
        videoRef,
        mediaStream,
      }}
    >
      {!isJoinMeeting ? (
        <JoinMeetingPage
          handleJoinMeeting={handleJoinMeeting}
          onAccepted={(data, peerCall) => {
            console.log("🚀 ~~ Index ~~ data: accepted ", data);
            setIsJoinMeeting(true);
            setUsers(data.users);
          }}
          setStreams={setStreams}
        />
      ) : null}
      {isJoinMeeting ? <MeetingPage users={users} /> : null}
    </MediaContext.Provider>
  );
};

export default Index;
