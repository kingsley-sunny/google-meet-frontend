import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { audioAtom, videoAtom } from "../../../../base/store/globalAtomStore";

export const useVideoRecord = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [isAudioEnabled, setIsAudioMuted] = useAtom(audioAtom);
  const [isVideoOpen, setIsVideoOpen] = useAtom(videoAtom);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    (async () => {
      // allow permission to use the user mic and video

      const newMediaStream = await window.navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
        video: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      // we set the video and the audio base on their global state
      newMediaStream.getAudioTracks()[0].enabled = isAudioEnabled;
      newMediaStream.getVideoTracks()[0].enabled = isVideoOpen;

      if (videoRef.current) {
        videoRef.current.srcObject = newMediaStream;
      }

      if (audioRef.current) {
        audioRef.current.srcObject = newMediaStream;
      }

      setMediaStream(newMediaStream);
    })();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [isVideoOpen, mediaStream]);

  const toggleVideo = () => {
    setIsVideoOpen(!isVideoOpen);
    if (mediaStream) {
      mediaStream.getVideoTracks()[0].enabled = !isVideoOpen;
    }
  };

  const toggleMic = () => {
    setIsAudioMuted(!isAudioEnabled);
    if (mediaStream) {
      mediaStream.getAudioTracks()[0].enabled = !isAudioEnabled;
    }
  };

  return {
    mediaStream,
    isAudioEnabled,
    isVideoOpen,
    videoRef,
    audioRef,
    toggleMic,
    toggleVideo,
  };
};
