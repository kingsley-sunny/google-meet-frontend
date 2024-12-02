import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { VIDEO_AND_AUDIO_STREAM_SETTINGS } from "../../constants/constant";
import { audioAtom, videoAtom } from "../../store/globalAtomStore";

export const useMediaStream = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream | undefined>();

  const [isAudioEnabled, setIsAudioMuted] = useAtom(audioAtom);
  const [isVideoOpen, setIsVideoOpen] = useAtom(videoAtom);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [offMeeting, setOffMeeting] = useState(false);

  console.log("media stream", mediaStream);
  useEffect(() => {
    startMeeting();

    return () => {
      stopMeeting();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createMediaStream = async () => {
    const stream = await window.navigator.mediaDevices.getUserMedia(
      VIDEO_AND_AUDIO_STREAM_SETTINGS
    );

    if (!window.stream) {
      window.stream = [stream];
    } else {
      window.stream?.push(stream);
    }

    setMediaStream(stream);

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true;
    }

    if (audioRef.current) {
      audioRef.current.srcObject = stream;
    }

    return stream;
  };

  const stopMediaStream = () => {
    if (mediaStream) {
      console.log("stop r-stream", mediaStream.id);
      const videoTrack = mediaStream.getVideoTracks()[0];
      const audioTrack = mediaStream.getAudioTracks()[0];
      mediaStream.getTracks().forEach(track => track.stop());
      mediaStream.removeTrack(videoTrack);
      mediaStream.removeTrack(audioTrack);
      setMediaStream(undefined);
    }
  };

  const startMeeting = async (): Promise<MediaStream> => {
    const mediaStream = await createMediaStream();
    (mediaStream as any).metadata = { video: isVideoOpen, audio: isAudioEnabled };
    setMediaStream(mediaStream);
    return mediaStream;
  };

  const toggleVideo = async () => {
    const videoTrack = mediaStream?.getVideoTracks()[0];

    if (videoTrack) {
      setIsVideoOpen(!isVideoOpen);
      videoTrack.enabled = !isVideoOpen;
    }
  };

  const toggleMic = async () => {
    const audio = mediaStream?.getAudioTracks()[0];
    if (audio) {
      // mediaStream.removeTrack(audio);
      setIsAudioMuted(!isAudioEnabled);
      audio.enabled = !isAudioEnabled;
    }
  };

  const stopMeeting = async () => {
    stopMediaStream();
  };

  return {
    mediaStream,
    isAudioEnabled,
    isVideoOpen,
    videoRef,
    audioRef,
    toggleMic,
    toggleVideo,
    stopMeeting,
    startMeeting,
    createMediaStream,
  };
};
