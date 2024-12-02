import { createContext, RefObject } from "react";

interface IMeetingPageProps {
  audioRef: RefObject<HTMLAudioElement>;
  isAudioEnabled: boolean;
  isVideoOpen: boolean;
  mediaStream?: MediaStream;
  audioStream?: MediaStream;
  videoStream?: MediaStream;
  screenShareRef: RefObject<HTMLVideoElement>;
  startMeeting: () => Promise<MediaStream>;
  toggleMic: () => Promise<void>;
  toggleVideo: () => Promise<void>;
  videoRef: RefObject<HTMLVideoElement>;
  stopMeeting: () => Promise<void>;
  screenShareStream?: MediaStream;
  createScreenShare: () => Promise<MediaStream>;
  stopScreenShare: () => void;
}

interface IMeetingPageProps2 {
  audioRef: RefObject<HTMLAudioElement>;
  isAudioEnabled: boolean;
  isVideoOpen: boolean;
  mediaStream?: MediaStream;
  startMeeting: () => Promise<MediaStream>;
  toggleMic: () => Promise<void>;
  toggleVideo: () => Promise<void>;
  videoRef: RefObject<HTMLVideoElement>;
  stopMeeting: () => Promise<void>;
  createMediaStream?: () => Promise<MediaStream>;
}

export const MediaContext = createContext<IMeetingPageProps2>({
  audioRef: { current: null } as any,
  isAudioEnabled: false,
  isVideoOpen: false,
  startMeeting: async () => new MediaStream(),
  toggleMic: async () => {},
  stopMeeting: async () => {},
  toggleVideo: async () => {},
  videoRef: { current: null },
});
