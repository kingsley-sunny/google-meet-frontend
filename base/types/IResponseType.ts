export interface IRequestError {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  error: string;
  resource: string;
}

export interface IRequestSuccess<T> {
  statusCode: number;
  message: string;
  timeStamp: Date;
  path: string;
  data: T;
  resource: string;
}

export interface IPagination {
  current_page: number;
  next_page: number;
  previous_page: number;
  limit: number;
  page_count: number;
  total: number;
}

export interface IBase {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface IUser extends IBase {
  name: string;
  email: string;
  pic_url?: string;
  accessToken?: string;
}

export interface IMeeting extends IBase {
  name: string;
  user_id: number;
}

export interface IMeetingInvite extends IBase {
  meeting_id: string;
  status: string;
  user_id: string;
  name: string;
}

export interface IMeetingUser extends IBase {
  meeting_id: string;
  name: string;
  status: string;
}
