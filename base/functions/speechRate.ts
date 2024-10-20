function calculateSpeechRate(dataArray: Uint8Array): number {
  // You can define your threshold based on frequency bands
  const speechThreshold = 128; // Example threshold value
  let speechCount = 0;

  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i] > speechThreshold) {
      speechCount++;
    }
  }

  // Return the rate as a percentage of active frequencies
  return (speechCount / dataArray.length) * 100; // percentage of active frequencies
}

export function getSpeechRate(mediaStream: MediaStream | undefined): number {
  if (!mediaStream) {
    return 0;
  }

  const audioContext = new (window.AudioContext || window.AudioContext)();
  const mediaStreamSource = audioContext.createMediaStreamSource(mediaStream);
  const analyser = audioContext.createAnalyser();

  mediaStreamSource.connect(analyser);
  analyser.fftSize = 2048; // Size of the FFT

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  analyser.getByteFrequencyData(dataArray);
  const speechRate = calculateSpeechRate(dataArray);

  return speechRate;
}
