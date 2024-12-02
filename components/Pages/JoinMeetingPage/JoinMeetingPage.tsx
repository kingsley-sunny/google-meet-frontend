import { DevTool } from "@hookform/devtools";
import { useAtom } from "jotai";
import { MicOffIcon, VideoIcon } from "lucide-react";
import { useRouter } from "next/router";
import { MediaConnection } from "peerjs";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useFakeVideoStream } from "../../../base/Contexts/MediaContext/useFakeVideoStream";
import { WsContext } from "../../../base/Contexts/wsContext/WsContext";
import { useFormManager } from "../../../base/hooks/useFormManager";
import { useAuth } from "../../../base/store/authStore/authStore";
import { audioAtom, videoAtom } from "../../../base/store/globalAtomStore";
import { AnyFunctionType } from "../../../base/types/types";
import { cn } from "../../../lib/utils";
import MicIcon from "../../Icons/MicIcon";
import VideoSlashIcon from "../../Icons/VideoSlashIcon";
import { Button } from "../../ui/button";
import Container from "../../ui/Container";
import { Input } from "../../ui/input";
import { useJoinMeetingWebsocket } from "./hooks/useJoinMeeting";
import { joinMeetingValidator } from "./joinMeetingValidator";

export const JoinMeetingPage = ({
  onAccepted,
  setStreams,
}: {
  onAccepted: (data: any, peerCall?: MediaConnection) => void;
  handleJoinMeeting?: (data: any, onAccepted?: AnyFunctionType) => void;
  setStreams?: Dispatch<SetStateAction<MediaStream[]>>;
}) => {
  // const { startMeeting } = useVideoRecord();
  const { user } = useAuth();
  const [meetingUser, setMeetingUser] = useState<any>();
  const router = useRouter();
  const { methods, control, handleSubmit } = useFormManager(joinMeetingValidator);
  const [isAudioEnabled, setIsAudioMuted] = useAtom(audioAtom);
  const [isVideoOpen, setIsVideoOpen] = useAtom(videoAtom);

  const socket = useContext(WsContext);

  const { fakeVideoRef, stopFakeStream } = useFakeVideoStream();

  const { handleJoinMeeting } = useJoinMeetingWebsocket();

  useEffect(() => {
    if (user) {
      setMeetingUser(user as any);
    }
    return () => {};
  }, []);

  function toggleVideo() {
    setIsVideoOpen(!isVideoOpen);
  }

  function toggleMic() {
    setIsAudioMuted(!isAudioEnabled);
  }

  return (
    <Container className='min-h-[80dvh] flex items-center w-full justify-center'>
      <div className='grid lg:grid-cols-5 w-full lg:justify-center items-center gap-12'>
        {/* video call section */}
        <div className='w-full h-96  lg:col-span-3'>
          <div className={cn("py-6 px-2 lg:px-4 mx-auto h-full w-full relative rounded-xl ")}>
            <div className='absolute inset-0 flex justify-center w-full h-full'>
              <video
                ref={fakeVideoRef}
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
                      onClick={toggleMic}
                    >
                      <MicIcon className='w-7 h-7 text-white' />
                    </button>
                  ) : (
                    <button
                      className='w-12 h-12 bg-destructive rounded-full flex justify-center items-center'
                      onClick={toggleMic}
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
                  if (handleJoinMeeting) {
                    handleJoinMeeting(
                      {
                        meeting_id: router.query["meetingCode"],
                        name: methods.getValues("name"),
                        user_id: user?.id,
                      },
                      data => {
                        stopFakeStream();
                        if (onAccepted) {
                          onAccepted(data);
                        }
                      }
                    );
                  }
                }}
                // isLoading={isLoading}
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
