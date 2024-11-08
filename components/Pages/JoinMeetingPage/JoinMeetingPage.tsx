import { DevTool } from "@hookform/devtools";
import { useAtom } from "jotai";
import { MicOffIcon, VideoIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { FormProvider } from "react-hook-form";
import { videoSettings } from "../../../base/constants/constant";
import { WsContext } from "../../../base/Contexts/wsContext/WsContext";
import { useEffectOnce } from "../../../base/hooks/useEffectOnce";
import { useFormManager } from "../../../base/hooks/useFormManager";
import { useAuth } from "../../../base/store/authStore/authStore";
import { audioAtom, videoAtom } from "../../../base/store/globalAtomStore";
import { cn } from "../../../lib/utils";
import MicIcon from "../../Icons/MicIcon";
import VideoSlashIcon from "../../Icons/VideoSlashIcon";
import { Button } from "../../ui/button";
import Container from "../../ui/Container";
import { Input } from "../../ui/input";
import { useJoinMeetingWebsocket } from "./hooks/useJoinMeeting";
import { joinMeetingValidator } from "./joinMeetingValidator";

export const JoinMeetingPage = () => {
  // const { startMeeting } = useVideoRecord();
  const { user } = useAuth();
  const [meetingUser, setMeetingUser] = useState<any>();
  const router = useRouter();
  const { methods, control, handleSubmit } = useFormManager(joinMeetingValidator);
  const [isVideoOpen, setIsVideoOpen] = useAtom(videoAtom);
  const [isAudioEnabled, setIsAudioEnabled] = useAtom(audioAtom);
  const [videoStream, setVideoStream] = useState<MediaStream | undefined>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { handleJoinMeeting, isLoading } = useJoinMeetingWebsocket(data => {
    console.log("🚀 ~~ JoinMeetingPage ~~ videoStream:", videoStream);
    // stopVideoStream();
    // videoStream.getTracks().forEach(track => track.stop());

    // router.push(`/${router.query.meetingCode}`);
  });
  const socket = useContext(WsContext);

  const createVideoStream = async () => {
    const stream = await window.navigator.mediaDevices.getUserMedia(videoSettings);
    setVideoStream(stream);

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    return stream;
  };

  const stopVideoStream = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(undefined);
    }
  };

  const toggleVideo = () => {
    setIsVideoOpen(!isVideoOpen);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  useEffect(() => {
    if (user) {
      setMeetingUser(user as any);
    }
  }, []);

  useEffectOnce(() => {
    createVideoStream();

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  });

  return (
    <Container className='min-h-[80dvh] flex items-center w-full justify-center'>
      <Button onClick={() => stopVideoStream()}>Off meeting</Button>
      <div className='grid lg:grid-cols-5 w-full lg:justify-center items-center gap-12'>
        {/* video call section */}
        <div className='w-full h-96  lg:col-span-3'>
          <div className={cn("py-6 px-2 lg:px-4 mx-auto h-full w-full relative rounded-xl ")}>
            <div className='absolute inset-0 flex justify-center w-full h-full'>
              <video
                ref={videoRef}
                autoPlay
                id='videoElement'
                className={cn("object-cover")}
                playsInline
              />

              <div className='absolute bottom-2 w-full'>
                <div className='bg-black/30 blur-3xl w-full h-full absolute z-0'></div>

                <div className='relative z-10  space-x-4  flex items-center justify-center'>
                  {isVideoOpen ? (
                    <button
                      className='w-12 h-12 bg-white/15 rounded-full flex justify-center items-center'
                      onClick={toggleVideo}
                    >
                      <VideoIcon className='w-7 h-7 text-white' />
                    </button>
                  ) : (
                    <button
                      className='w-12 h-12 bg-destructive rounded-full flex justify-center items-center'
                      onClick={toggleVideo}
                    >
                      <VideoSlashIcon className='w-7 h-7 text-white' />
                    </button>
                  )}

                  {isAudioEnabled ? (
                    <button
                      className='w-12 h-12 bg-white/15 rounded-full flex justify-center items-center'
                      onClick={toggleAudio}
                    >
                      <MicIcon className='w-7 h-7 text-white' />
                    </button>
                  ) : (
                    <button
                      className='w-12 h-12 bg-destructive rounded-full flex justify-center items-center'
                      onClick={toggleAudio}
                    >
                      <MicOffIcon className='w-7 h-7 text-white' />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* the mini form and the button to call section */}
        <div className='lg:col-span-2 w-full'>
          <FormProvider {...methods}>
            <form
              className='max-w-3xl space-y-4  w-full flex flex-col items-center'
              // onSubmit={}
            >
              <input type='text' name='meeting_id' value={router.query["meetingCode"]} />
              {!meetingUser?.name ? (
                <label htmlFor='name' className='text-2xl font-medium text-center w-full block'>
                  What&lsquo;s your Name?
                </label>
              ) : (
                <label htmlFor='name' className='text-2xl font-medium text-center w-full block'>
                  Ready to Join
                </label>
              )}
              {!meetingUser && (
                <Input name='name' type={"text"} className='border-border/50 h-14 mt-5 w-full' />
              )}

              <Button
                onClick={() => {
                  handleJoinMeeting(
                    {
                      meeting_id: router.query["meetingCode"],
                      name: methods.getValues("name"),
                      user_id: user?.id,
                    },
                    data => {
                      stopVideoStream();
                      router.push(`/${router.query.meetingCode}`);
                    }
                  );
                }}
                isLoading={isLoading}
                size={"lg"}
                type='button'
                className='rounded-full'
              >
                Ask to Join
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
      <DevTool control={control} /> {/* set up the dev tool */}
    </Container>
  );
};
