export const videoSettings: MediaStreamConstraints = {
  audio: false,
  video: {
    width: { ideal: 1280 }, // Set ideal width for better resolution
    height: { ideal: 720 }, // Set ideal height for better resolution
    facingMode: "user", // Use the front camera (or 'environment' for the back)
    frameRate: { ideal: 30 }, // Aim for a higher frame rate for smoother video
    // Advanced options for brightness and sharpness
    // (note: not all browsers may support these)
  },
};

export const audioSettings: MediaStreamConstraints = {
  video: false,
  audio: {
    echoCancellation: true, // Removes echo from the audio
    noiseSuppression: true, // Reduces background noise
    autoGainControl: true, // Adjusts the gain automatically
    sampleRate: 16000, // Use a higher sample rate for better clarity
    channelCount: 1, // Mono audio is often clearer for speech
  },
};
