import { MicOffIcon, MinusIcon, PlusIcon, UserIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const { audioRef, isAudioEnabled, isVideoOpen, mediaStream, toggleMic, toggleVideo, videoRef } =
    useVideoRecord();

  const [isScreenShare, setIsScreenShare] = useState<boolean>(false);
  const [screenStream, setScreenStream] = useState<MediaStream>();
  const screenShareRef = useRef<HTMLVideoElement>(null);

  console.log("🚀 ~~ MeetingPage ~~ screenStream:", screenStream);

  const [counter, setCounter] = useState<number>(1);

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
    if (!isScreenShare) {
      const mediaScreenStream = await window.navigator.mediaDevices.getDisplayMedia({
        audio: false,
        video: true,
      });

      setScreenStream(mediaScreenStream);
      setIsScreenShare(true);
      return;
    }

    setScreenStream(undefined);
    setIsScreenShare(false);
  };

  useEffect(() => {
    console.log("🚀 ~~ useEffect ~~ screenStream:", screenStream);
    if (screenShareRef.current && screenStream) {
      screenShareRef.current.srcObject = screenStream;

      (screenStream as MediaStream & { oninactive: (...val: any) => any }).oninactive = () => {
        toggleScreenShare();
      };
    }
  }, [isScreenShare, screenStream]);

  return (
    <div className='bg-black/90 flex relative h-screen text-white px-8 py-4'>
      <div
        className={cn(
          "border-2 py-16 h-full flex flex-wrap gap-4 items-center w-full",
          counter === 2 && "grid grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 sm:place-items-center",
          counter === 3 && "grid grid-rows-3 sm:grid-cols-2 sm:grid-rows-2",
          counter === 4 && "grid grid-rows-4 sm:grid-cols-2 sm:grid-rows-2",

        )}
      >
        {!isVideoOpen
          ? Array.from({ length: counter }).map((_, index) => (
              <div
                key={_ as any}
                className='min-w-[200px] border-2 py-6 px-4 mx-auto h-full w-full relative bg-white/10 rounded-xl flex justify-center items-center'
              >
                <Avatar className='w-12 h-12 lg:w-32 lg:h-32'>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback>
                    <UserIcon className='w-28 h-2' />
                  </AvatarFallback>
                </Avatar>

                <p className='text-sm lg:text-lg absolute bottom-4 left-4'>John Doe</p>

                <div className='absolute top-10 right-10'>
                  {isAudioEnabled ? (
                    <MicIcon className='w-4 h-4 lg:w-6 lg:h-6' />
                  ) : (
                    <MicOffIcon className='w-4 h-4 lg:w-6 lg:h-6' />
                  )}
                </div>
              </div>
            ))
          : null}

        {isVideoOpen
          ? Array.from({ length: counter }).map((_, index) => (
              <div
                key={_ as any}
                className={cn(
                  "min-w-[200px] border-2 py-6 px-4 mx-auto h-full w-full relative bg-white/10 rounded-xl flex justify-center items-center overflow-hidden"
                  // counter === 1 && "max-h-full h-1/2 xl:h-full",
                  // counter === 1 && "max-h-full h-1/2 xl:h-full",
                )}
              >
                <div className='relative flex h-full'>
                  <video
                    ref={videoRef}
                    autoPlay
                    width={"100%"}
                    id='videoElement'
                    className='w-full min-w-64 min-h-32 h-full'
                    muted
                  />
                  <div className='absolute top-0 h-32 w-full bg-gradient-to-b from-black/20 to-transparent'></div>
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
            ))
          : null}

        {isScreenShare ? (
          <div className='min-w-[200px] py-6 mx-auto relative bg-white/10 rounded-xl flex justify-center items-center overflow-hidden px-10'>
            <div className='relative flex h-full'>
              <video ref={screenShareRef} autoPlay width={"100%"} className='w-full h-full' muted />
              <div className='absolute top-0 h-32 w-full bg-gradient-to-b from-black/20 to-transparent'></div>
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
        ) : null}
      </div>

      <audio ref={audioRef} autoPlay muted></audio>

      {/* The bottom nav */}
      <div className='fixed w-full bottom-0 flex justify-between '>
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

          <button className='w-12 h-12 bg-white/15 rounded-full flex justify-center items-center'>
            <MdOutlineScreenShare className='w-5 h-5' onClick={toggleScreenShare} />
          </button>

          <button className='w-12 h-12 bg-white/15 rounded-full flex justify-center items-center'>
            <ImPhoneHangUp className='w-5 h-5' />
          </button>

          <button className='w-12 h-12 bg-white/15 rounded-full flex justify-center items-center'>
            <PlusIcon className='w-5 h-5' onClick={incrementCounter} />
          </button>

          <button className='w-12 h-12 bg-white/15 rounded-full flex justify-center items-center'>
            <MinusIcon className='w-5 h-5' onClick={decrementCounter} />
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
