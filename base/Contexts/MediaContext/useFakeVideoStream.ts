import { useEffect, useRef, useState } from "react";
import { videoSettings } from "../../constants/constant";

export const useFakeVideoStream = () => {
  const [videoStream, setVideoStream] = useState<MediaStream>();
  const fakeVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    (async () => {
      await startStream();
    })();

    return () => {
      stopFakeStream();
    };
  }, []);

  const startStream = async () => {
    const videoStream = await window.navigator.mediaDevices.getUserMedia(videoSettings);
    console.log("start f-stream", videoStream.id);
    if (!window.stream) {
      window.stream = [videoStream];
    } else {
      window.stream?.push(videoStream);
    }

    setVideoStream(videoStream);
    if (fakeVideoRef.current) {
      fakeVideoRef.current.srcObject = videoStream;
    }
  };

  const stopFakeStream = () => {
    if (videoStream) {
      console.log("stop f-stream", videoStream.id);
      videoStream.getTracks().forEach(track => track.stop());
      // videoStream.removeTrack(videoStream.getTracks()[0]);
    }
  };

  return { fakeVideoRef, stopFakeStream };
};
