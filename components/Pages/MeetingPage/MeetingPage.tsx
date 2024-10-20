import { MicOffIcon, MinusIcon, PlusIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { ImPhoneHangUp } from "react-icons/im";
import { LuUsers2 } from "react-icons/lu";
import { MdOutlineMessage, MdOutlineScreenShare } from "react-icons/md";
import { cn } from "../../../lib/utils";
import MicIcon from "../../Icons/MicIcon";
import VideoIcon from "../../Icons/VideoIcon";
import VideoSlashIcon from "../../Icons/VideoSlashIcon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { useVideoRecord } from "./hooks/useVideoRecord";

const MeetingPage = () => {
  const {
    audioRef,
    isAudioEnabled,
    isVideoOpen,
    mediaStream,
    audioStream,
    videoStream,
    screenShareRef,
    startMeeting,
    toggleMic,
    toggleVideo,
    videoRef,
    stopMeeting,
    screenShareStream,
    createScreenShare,
    stopScreenShare,
    // speechRate,
  } = useVideoRecord();

  const router = useRouter();

  const [speechRate, setSpeechRate] = useState<number>(0);

  const [counter, setCounter] = useState<number>(3);

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

  const toggleScreenShare = async () => {
    if (!screenShareStream) {
      createScreenShare();
      return;
    }

    stopScreenShare();
  };

  console.log("speech rate", speechRate);

  console.log("fuck your shit", mediaStream?.getTracks(), screenShareRef?.current?.srcObject);

  return (
    <div className='bg-background-darkBlack flex flex-col  relative h-[100dvh] justify-between text-white px-2 lg:px-8 py-4'>
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
              <Avatar className='w-12 h-12 lg:w-32 lg:h-32'>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>
                  <UserIcon className='w-28 h-2' />
                </AvatarFallback>
              </Avatar>

              <p className='text-sm lg:text-lg absolute bottom-4 left-4'>John Doe</p>

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
                id='videoElement'
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
          </div>
        )}

        <div
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
        </div>
      </div>

      <audio ref={audioRef} autoPlay></audio>

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
              onClick={toggleMic}
            >
              <MicIcon className='w-5 h-5' />
            </button>
          ) : (
            <button
              className='w-12 h-12 bg-destructive rounded-full flex justify-center items-center'
              onClick={toggleMic}
            >
              <MicOffIcon className='w-5 h-5' />
            </button>
          )}

          {isVideoOpen ? (
            <button
              className='w-12 h-12 bg-white/15 rounded-full flex justify-center items-center'
              onClick={toggleVideo}
            >
              <VideoIcon className='w-5 h-5' />
            </button>
          ) : (
            <button
              className='w-12 h-12 bg-destructive rounded-full flex justify-center items-center'
              onClick={toggleVideo}
            >
              <VideoSlashIcon className='w-5 h-5' />
            </button>
          )}

          <button
            className='w-12 h-12 bg-white/15 rounded-full flex justify-center items-center'
            onClick={toggleScreenShare}
          >
            <MdOutlineScreenShare className='w-5 h-5' />
          </button>

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
