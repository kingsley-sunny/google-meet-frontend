import { useState } from "react";

export const useScreenRecord = () => { 
  const [isScreenShare, setIsScreenShare] = useState<boolean>(false);
  const [screenStream, setScreenStream] = useState<MediaStream>();

  const createScreenRecord = async () => {
    const screenStream = await window.navigator.mediaDevices.getDisplayMedia({
      audio: false,
      video: {
        width: { ideal: 1280 }, // Set ideal width for better resolution
        height: { ideal: 720 }, // Set ideal height for better resolution
        facingMode: "user", // Use the front camera (or 'environment' for the back)
        frameRate: { ideal: 30 }, // Aim for a higher frame rate for smoother video
        // Advanced options for brightness and sharpness
        // (note: not all browsers may support these)
      },
    })


    // const me
  }



}