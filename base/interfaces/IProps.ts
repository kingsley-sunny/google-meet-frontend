import { ReactNode } from "react";

export interface ICommonProps {
  className?: string;
  children?: ReactNode;
}

export interface ISocketMeetingUser {
  meeting_token?: string;
  name?: string;
  user_id?: string;
  peer_id: string;
  socket_id: string;
  meeting_id?: string;
}
