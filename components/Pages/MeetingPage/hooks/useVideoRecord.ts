import { useAtom } from "jotai";
import { useRef, useState } from "react";
import { useEffectOnce } from "../../../../base/hooks/useEffectOnce";
import { audioAtom, videoAtom } from "../../../../base/store/globalAtomStore";

export const useVideoRecord = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream | undefined>();
  const [videoStream, setVideoStream] = useState<MediaStream | undefined>();
  const [audioStream, setAudioStream] = useState<MediaStream | undefined>();
  const [screenShareStream, setScreenStream] = useState<MediaStream | undefined>();

  const [isAudioEnabled, setIsAudioMuted] = useAtom(audioAtom);
  const [isVideoOpen, setIsVideoOpen] = useAtom(videoAtom);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);

  const [offMeeting, setOffMeeting] = useState(false);

  useEffectOnce(() => {
    if (!offMeeting) {
      startMeeting();
    } else {
      stopMeeting();
      setMediaStream(undefined);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const createVideoStream = async () => {
    const stream = await window.navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: { ideal: 1280 }, // Set ideal width for better resolution
        height: { ideal: 720 }, // Set ideal height for better resolution
        facingMode: "user", // Use the front camera (or 'environment' for the back)
        frameRate: { ideal: 30 }, // Aim for a higher frame rate for smoother video
        // Advanced options for brightness and sharpness
        // (note: not all browsers may support these)
      },
    });
    setVideoStream(stream);

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    return stream;
  };

  const stopVideoStream = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      mediaStream?.removeTrack(videoStream.getVideoTracks()[0]);
      setVideoStream(undefined);
    }
  };

  const createAudioStream = async () => {
    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: false,
      audio: {
        echoCancellation: true, // Removes echo from the audio
        noiseSuppression: true, // Reduces background noise
        autoGainControl: true, // Adjusts the gain automatically
        sampleRate: 16000, // Use a higher sample rate for better clarity
        channelCount: 1, // Mono audio is often clearer for speech
      },
    });
    setAudioStream(stream);

    if (audioRef.current) {
      audioRef.current.srcObject = stream;
    }
    return stream;
  };

  const stopAudioStream = () => {
    if (audioStream) {
      audioStream.getTracks().forEach(track => track.stop());
      mediaStream?.removeTrack(audioStream.getAudioTracks()[0]);
      setAudioStream(undefined);
    }
  };

  const createScreenShare = async () => {
    const stream = await window.navigator.mediaDevices.getDisplayMedia({
      audio: false,
      video: {
        width: { ideal: 1280 }, // Set ideal width for better resolution
        height: { ideal: 720 }, // Set ideal height for better resolution
        facingMode: "user", // Use the front camera (or 'environment' for the back)
        frameRate: { ideal: 30 }, // Aim for a higher frame rate for smoother video
        // Advanced options for brightness and sharpness
        // (note: not all browsers may support these)
      },
    });
    setScreenStream(stream);

    if (mediaStream) {
      mediaStream.addTrack(stream.getVideoTracks()[0]);
    }

    if (screenShareRef.current) {
      screenShareRef.current.srcObject = stream;
    }
    return stream;
  };

  const stopScreenShare = () => {
    if (screenShareStream) {
      screenShareStream.getTracks().forEach(track => track.stop());
      mediaStream?.removeTrack(screenShareStream.getVideoTracks()[0]);
      setScreenStream(undefined);
    }
  };

  const startMeeting = async (): Promise<MediaStream> => {
    const videoStream = isVideoOpen ? await createVideoStream() : undefined;
    const audioStream = isAudioEnabled ? await createAudioStream() : undefined;

    const stream = new MediaStream();

    if (videoStream) {
      stream.addTrack(videoStream.getVideoTracks()[0]);
    }
    if (audioStream) {
      stream.addTrack(audioStream.getAudioTracks()[0]);
    }

    setMediaStream(stream);
    return stream;
  };

  const toggleVideo = async () => {
    setIsVideoOpen(!isVideoOpen);
    if (isVideoOpen && videoStream) {
      stopVideoStream();
      return;
    }

    if (!isVideoOpen && !videoStream) {
      const videoStream = await createVideoStream();
      mediaStream?.addTrack(videoStream?.getVideoTracks()[0]);
      return;
    }
  };

  const toggleMic = async () => {
    setIsAudioMuted(!isAudioEnabled);
    if (isAudioEnabled && audioStream) {
      stopAudioStream();
      return;
    }

    if (!isAudioEnabled && !audioStream) {
      const audioStream = await createAudioStream();
      mediaStream?.addTrack(audioStream.getAudioTracks()[0]);
      return;
    }
  };

  const stopMeeting = async () => {
    stopAudioStream();
    stopVideoStream();
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      mediaStream.getTracks().forEach(track => mediaStream.removeTrack(track));
      setMediaStream(undefined);
      setOffMeeting(true);
    }
  };

  return {
    mediaStream,
    videoStream,
    audioStream,
    screenShareStream,
    isAudioEnabled,
    isVideoOpen,
    videoRef,
    audioRef,
    screenShareRef,
    toggleMic,
    toggleVideo,
    createScreenShare,
    stopScreenShare,
    stopMeeting,
    startMeeting,
  };
};
