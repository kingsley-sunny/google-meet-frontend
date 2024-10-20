import { useRef, useState } from "react";
import { useEffectOnce } from "../../../base/hooks/useEffectOnce";

const TestingPage = (): JSX.Element => {
  // controls if media input is on or off
  const [playing, setPlaying] = useState<boolean>(false);

  // controls the current stream value
  const [stream, setStream] = useState<MediaStream | null>(null);

  // controls if audio/video is on or off (seperately from each other)
  const [audio, setAudio] = useState<boolean>(true);
  const [video, setVideo] = useState<boolean>(true);

  // controls the video DOM element
  const webcamVideo = useRef<HTMLVideoElement | null>(null);

  // get the user's media stream
  const startStream = async (): Promise<MediaStream> => {
    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    console.log("🚀 ~~ startStream ~~ webcamVideo.current:", webcamVideo.current);
    if (webcamVideo.current) {
      webcamVideo.current.srcObject = stream;
    }
    setStream(stream);
    setPlaying(true);

    return stream;
  };

  // stops the user's media stream
  const stopStream = (): void => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }

    setPlaying(false);
  };

  // enable/disable audio tracks in the media stream
  const toggleAudio = (): void => {
    setAudio(!audio);
    if (stream) {
      stream.getAudioTracks()[0].enabled = audio;
    }
  };

  // enable/disable video tracks in the media stream
  const toggleVideo = (): void => {
    setVideo(!video);
    if (stream) {
      stream.getVideoTracks()[0].enabled = !video;
    }
  };

  useEffectOnce(() => {
    startStream();
  });

  return (
    <div className='container'>
      <video ref={webcamVideo} autoPlay playsInline></video>
      <div className='space-x-8'>
        <button onClick={playing ? stopStream : startStream}>Start webcam</button>

        <button onClick={toggleAudio}>Toggle Sound</button>
        <button onClick={toggleVideo}>Toggle Video</button>
      </div>
    </div>
  );
};

export default TestingPage;
