import { MicOffIcon, MinusIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { ImPhoneHangUp } from "react-icons/im";
import { LuUsers2 } from "react-icons/lu";
import { MdOutlineMessage } from "react-icons/md";

import Peer from "peerjs";
import { MediaContext } from "../../../base/Contexts/MediaContext/MediaContext";
import { WsContext } from "../../../base/Contexts/wsContext/WsContext";
import { useAuth } from "../../../base/store/authStore/authStore";
import { cn } from "../../../lib/utils";
import MicIcon from "../../Icons/MicIcon";
import VideoIcon from "../../Icons/VideoIcon";
import VideoSlashIcon from "../../Icons/VideoSlashIcon";
import { UserAvatar } from "../../ui/UserAvatar";
import { ApprovalModal } from "./ApprovalModal";
import { useMeetingRequestsWebSocket } from "./hooks/useMeetingWebSocket";

interface IMeetingStreamObjects {
  id: string;
  stream: MediaStream;
  user: { id?: string; name: string; pic_url?: string };
}

const MeetingPage = ({ users }: { users: any[] }) => {
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
    // speechRate,
  } = useContext(MediaContext);

  const { meetingToken } = useAuth();

  const router = useRouter();

  const [speechRate, setSpeechRate] = useState<number>(0);
  const [streamObjects, setStreamObjects] = useState<IMeetingStreamObjects[]>([]);
  console.log("🚀 ~~ MeetingPage ~~ streams:", streamObjects);

  const [counter, setCounter] = useState<number>(streamObjects?.length + 1);
  const [myPeer, setMyPeer] = useState<Peer | null>(null);
  const { user: currentUser, tempUser } = useAuth();

  const { isApprovalModalOpen, meetingRequests, setIsApprovalModalOpen } =
    useMeetingRequestsWebSocket();
  const socket = useContext(WsContext);
  const videoRefs = useRef([]);

  const incrementCounter = () => {
    if (counter < 14) {
      setCounter(counter + 1);
    }
  };

  const decrementCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  //todo:
  // const toggleScreenShare = async () => {
  //   if (!screenShareStream) {
  //     createScreenShare();
  //     return;
  //   }

  //   stopScreenShare();
  // };

  // useEffectOnce(() => {
  //   startMeeting();

  //   return () => {
  //     if (mediaStream) {
  //       ("ending media stream");

  //       mediaStream.getTracks().forEach(track => track.stop());
  //     }
  //   };
  // });

  // Handle calling another peer

  useEffect(() => {
    // Ensure the video elements are updated when streams change
    console.log("stream changed", streamObjects);
    if (streamObjects.length > 0) {
      streamObjects.forEach((stream, index) => {
        const video = document.getElementById(stream.stream.id) as HTMLVideoElement;
        if (video && video.srcObject) {
          video.srcObject = stream.stream;
        }
        console.log("🚀 ~~ streams.forEach ~~ video:", video, stream);
      });
    }

    setCounter(streamObjects.length + 1);
  }, [streamObjects]); // Re

  useEffect(() => {
    if (isVideoOpen && videoRef.current) {
      videoRef.current.srcObject = mediaStream as MediaStream;
    }
  }, [isVideoOpen]);

  useEffect(() => {
    console.log("useeffect-mounted-many-times");

    if (socket && socket.id) {
      const peer = new Peer(socket.id, {
        host: process.env.NEXT_PUBLIC_PEERJS_HOST as string,
        port: Number(5000) as number,
        path: "/signal-peer",
      });

      console.log("created peer", peer);

      setMyPeer(peer);
      if (mediaStream) {
        console.log("currentUser?.name || tempUser?.name", currentUser?.name || tempUser);
        (mediaStream as any).metadata = {
          name: currentUser?.name || tempUser?.name,
          id: currentUser?.id || tempUser?.name,
          pic_url: currentUser?.pic_url || tempUser?.name,
        };

        users.forEach(user => {
          if (user.socket_id !== socket.id) {
            console.log("that is fuck", user.socket_id, peer);
            const call = peer.call(user.socket_id, mediaStream, {
              metadata: {
                name: currentUser?.name || tempUser?.name,
                id: currentUser?.id || tempUser?.name,
                pic_url: currentUser?.pic_url || tempUser?.name,
              },
            });

            console.log("🚀 ~~ useEffect ~~ user.socket_id:", user);
            console.log("call.connectionId", call.connectionId);

            call.on("stream", stream => {
              console.log("🚀 ~~ call.on ~~ stream:", (stream as any)?.metadata);
              setStreamObjects(prev => {
                const existingStream = prev.find(s => {
                  return s.stream.id === stream.id;
                });
                if (!existingStream)
                  return [
                    ...prev,
                    {
                      id: user.socket_id,
                      stream,
                      user: { name: user?.name, pic_url: user.pic_url, id: user?.id },
                    },
                  ];
                return prev;
              });
            });
          }
        });
      }

      // call the peer

      // When you receive a call
      peer.on("call", call => {
        console.log("call.connectionId", call.connectionId, call.metadata);
        call.answer(mediaStream);

        call.on("stream", stream => {
          console.log("ON STream", (stream as any)?.metadata);
          setStreamObjects(prev => {
            const existingStream = prev.find(s => {
              return s.stream.id === stream.id;
            });
            if (!existingStream)
              return [
                ...prev,
                {
                  id: call.peer,
                  stream,
                  user: {
                    ...call.metadata,
                  },
                },
              ];
            return prev;
          });
        });
      });

      // Cleanup function to close the peer connection when the component unmounts
      return () => {
        if (peer) {
          peer.destroy();
        }
      };
    }
  }, []);

  useEffect(() => {
    // listen to change of mic
    if (socket) {
      socket.on("/meeting/toggleDevice/response", data => {
        //TODO: UPDATE THE MIC AND THE VIDEO BASE ON THIS DATA
        console.log("🚀 ~~ useEffect ~~ data:", data);

        // first get the socket id from the stream,
        const stream = streamObjects.find(stream => {
          return stream.id === data.socket_id;
        });
        const streamIndex = streamObjects.findIndex(stream => {
          return stream.id === data.socket_id;
        });

        if (stream) {
          setStreamObjects(prev => {
            const prevState = [...prev];
            prevState[streamIndex].stream.getVideoTracks()[0].enabled = data.video;
            prevState[streamIndex].stream.getAudioTracks()[0].enabled = data.audio;
            return prevState;
          });
        }

        // then set the stream video object and the audio
      });
    }
  }, [socket, streamObjects]);

  return (
    <div className='bg-background-darkBlack flex flex-col  relative h-[100dvh] justify-between text-white px-2 lg:px-8 py-4'>
      <ApprovalModal
        requests={meetingRequests}
        isOpen={isApprovalModalOpen}
        setIsOpen={setIsApprovalModalOpen}
      />

      <div
        className={cn(
          "py-16 flex gap-4 items-center h-full w-full",
          counter === 2 && "flex-col lg:flex-row",
          counter >= 3 && "grid grid-cols-2"
        )}
      >
        {!isVideoOpen && (
          <div className='py-6 px-4 mx-auto h-full w-full relative bg-white/10 rounded-xl'>
            <div className=' flex justify-center items-center absolute inset-0'>
              <UserAvatar className='w-12 h-12 lg:w-32 lg:h-32 !text-black' />

              <p className='text-sm lg:text-lg absolute bottom-4 left-4'>
                {currentUser?.name || tempUser?.name}
              </p>

              <div className='absolute top-10 right-10'>
                {isAudioEnabled ? (
                  <div
                    style={{ borderWidth: speechRate * 2 }}
                    className='rounded-full p-2 border-blue-500'
                  >
                    <MicIcon className='w-4 h-4 lg:w-6 lg:h-6' />
                  </div>
                ) : (
                  <MicOffIcon className='w-4 h-4 lg:w-6 lg:h-6' />
                )}
              </div>
            </div>
          </div>
        )}

        {isVideoOpen && (
          <div
            className={cn(
              "py-6 px-2 lg:px-4 mx-auto h-full w-full relative rounded-xl ",
              counter > 1 && "bg-white/10"
            )}
          >
            <div className='absolute inset-0 flex justify-center w-full h-full'>
              <video
                ref={videoRef}
                autoPlay
                muted
                id='videoElement'
                className={cn("object-cover", counter > 1 && "object-contain")}
                playsInline
              />
              {counter > 1 && (
                <div className='absolute top-0 h-32 w-full bg-gradient-to-b from-black/20 to-transparent'></div>
              )}
            </div>

            <p className='text-sm lg:text-lg absolute bottom-4 left-4'>
              {currentUser?.name || tempUser?.name}
            </p>

            <div className='absolute top-10 right-10'>
              {isAudioEnabled ? (
                <MicIcon className='w-4 h-4 lg:w-6 lg:h-6' />
              ) : (
                <MicOffIcon className='w-4 h-4 lg:w-6 lg:h-6' />
              )}
            </div>
          </div>
        )}

        {streamObjects.map((stream, index) => (
          <div
            key={stream.stream.id}
            className={cn(
              "py-6 px-2 lg:px-4 mx-auto h-full w-full relative rounded-xl ",
              counter > 1 && "bg-white/10"
            )}
          >
            {stream.stream?.getVideoTracks()[0]?.enabled ? (
              <div className='absolute inset-0 flex justify-center w-full h-full'>
                <video
                  ref={el => {
                    console.log("element fuck", el);
                    (videoRefs as any).current[index] = el;
                    if (el) {
                      el.srcObject = stream.stream;
                    }
                  }} // Assigning video element ref
                  autoPlay
                  id={stream.stream.id}
                  className={cn(
                    "object-cover",
                    counter > 1 && "object-contain",
                    "remote-video-element"
                  )}
                  playsInline
                />
                {counter > 1 && (
                  <div className='absolute top-0 h-32 w-full bg-gradient-to-b from-black/20 to-transparent'></div>
                )}
              </div>
            ) : (
              <div className=' flex justify-center items-center absolute inset-0'>
                <UserAvatar
                  className='w-12 h-12 lg:w-32 lg:h-32 !text-black'
                  url={stream?.user?.pic_url}
                />

                <p className='text-sm lg:text-lg absolute bottom-4 left-4'>{stream?.user?.name}</p>
              </div>
            )}

            <p className='text-sm lg:text-lg absolute bottom-4 left-4'>{stream?.user?.name}</p>

            <div className='absolute top-10 right-10'>
              {stream.stream?.getAudioTracks()[0]?.enabled ? (
                <MicIcon className='w-4 h-4 lg:w-6 lg:h-6' />
              ) : (
                <MicOffIcon className='w-4 h-4 lg:w-6 lg:h-6' />
              )}
            </div>
          </div>
        ))}

        {/* //Todo: */}
        {/* <div
          className={cn(
            "py-6 px-2 lg:px-4 mx-auto h-full w-full relative rounded-xl ",
            counter > 1 && "bg-white/10",
            !screenShareStream && "hidden"
          )}
        >
          <div className='absolute inset-0 flex justify-center w-full h-full'>
            <video
              ref={screenShareRef}
              autoPlay
              className={cn("object-cover", counter > 1 && "object-contain")}
              playsInline
            />
            {counter > 1 && (
              <div className='absolute top-0 h-32 w-full bg-gradient-to-b from-black/20 to-transparent'></div>
            )}
          </div>

          <p className='text-sm lg:text-lg absolute bottom-4 left-4'>John Doe</p>

          <div className='absolute top-10 right-10'>
            {isAudioEnabled ? (
              <MicIcon className='w-4 h-4 lg:w-6 lg:h-6' />
            ) : (
              <MicOffIcon className='w-4 h-4 lg:w-6 lg:h-6' />
            )}
          </div>
        </div> */}
      </div>

      <audio ref={audioRef} muted autoPlay></audio>

      {/* The bottom nav */}
      <div className='relative z-20 w-full bottom-0 flex justify-between '>
        <div className='hidden lg:flex space-x-4 items-center '>
          <p className=''>{new Date().toDateString()}</p>

          <div className='py-1 border-l pl-4 border-l-muted-foreground'>New Meeting</div>
        </div>

        {/* the icons */}
        <div className='flex space-x-4 items-center'>
          {isAudioEnabled ? (
            <button
              className='w-12 h-12 bg-white/15 rounded-full flex justify-center items-center'
              onClick={() => {
                // send information to other sockets
                socket?.emit("/meeting/toggleDevice", {
                  audio: false,
                  meeting_token: meetingToken,
                  video: isVideoOpen,
                  meeting_id: router.query.meetingCode,
                });
                toggleMic();
              }}
            >
              <MicIcon className='w-5 h-5' />
            </button>
          ) : (
            <button
              className='w-12 h-12 bg-destructive rounded-full flex justify-center items-center'
              onClick={() => {
                // send information to other sockets
                socket?.emit("/meeting/toggleDevice", {
                  audio: true,
                  meeting_token: meetingToken,
                  video: isVideoOpen,
                  meeting_id: router.query.meetingCode,
                });
                toggleMic();
              }}
            >
              <MicOffIcon className='w-5 h-5' />
            </button>
          )}

          {isVideoOpen ? (
            <button
              className='w-12 h-12 bg-white/15 rounded-full flex justify-center items-center'
              onClick={() => {
                socket?.emit("/meeting/toggleDevice", {
                  audio: isAudioEnabled,
                  meeting_token: meetingToken,
                  video: false,
                  meeting_id: router.query.meetingCode,
                });
                toggleVideo();
              }}
            >
              <VideoIcon className='w-5 h-5' />
            </button>
          ) : (
            <button
              className='w-12 h-12 bg-destructive rounded-full flex justify-center items-center'
              onClick={() => {
                socket?.emit("/meeting/toggleDevice", {
                  audio: isAudioEnabled,
                  meeting_token: meetingToken,
                  video: true,
                  meeting_id: router.query.meetingCode,
                });
                toggleVideo();
              }}
            >
              <VideoSlashIcon className='w-5 h-5' />
            </button>
          )}

          {/* {//todo:} */}
          {/* <button
            className='w-12 h-12 bg-white/15 rounded-full flex justify-center items-center'
            onClick={toggleScreenShare}
          >
            <MdOutlineScreenShare className='w-5 h-5' />
          </button> */}

          <button
            className='w-12 h-12 bg-destructive rounded-full flex justify-center items-center'
            onClick={() => {
              stopMeeting();
              // router.push("/");
            }}
          >
            <ImPhoneHangUp className='w-5 h-5' />
          </button>

          <button
            className='w-12 h-12 bg-white/15 rounded-full flex justify-center items-center'
            onClick={incrementCounter}
          >
            <PlusIcon className='w-5 h-5' />
          </button>

          <button
            className='w-12 h-12 bg-white/15 rounded-full flex justify-center items-center'
            onClick={decrementCounter}
          >
            <MinusIcon className='w-5 h-5' />
          </button>
        </div>

        {/* THE SETTINGS AND THE CHAT ICONS */}
        <div className='lg:flex space-x-4 items-center hidden'>
          <button className='w-12 h-12 rounded-full flex justify-center items-center'>
            <BsInfoCircle className='w-6 h-6' />
          </button>

          <button className='w-12 h-12 rounded-full flex justify-center items-center'>
            <LuUsers2 className='w-6 h-6' />
          </button>

          <button className='w-12 h-12 rounded-full flex justify-center items-center'>
            <MdOutlineMessage className='w-6 h-6' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingPage;
