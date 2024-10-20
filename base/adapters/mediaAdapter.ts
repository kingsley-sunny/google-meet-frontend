export class MediaStreamAdapter {
  private stream: MediaStream | undefined;
  constructor() {}

  async startStream() {
    if (!this.stream && window) {
      this.stream = await window.navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
        video: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
    }

    return this.stream;
  }

  async stopStream() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = undefined;
    }
  }

  getStream() {
    return this.stream;
  }

  toggleVideo(value: boolean) {
    if (this.stream) {
      this.stream.getVideoTracks()[0].enabled = value;
    }
  }

  toggleAudio(value: boolean) {
    if (this.stream) {
      this.stream.getAudioTracks()[0].enabled = value;
    }
  }
}
