import { CookieValueTypes } from "cookies-next";
import { IUser } from "../../types/IResponseType";

export interface IAuth {
  accessToken: string | undefined;
  setAuthToken: (token: IAuth["accessToken"]) => void;

  user: Partial<IUser> | undefined;
  setUser: (user: IAuth["user"]) => void;

  logOut: () => void;

  userEmail: CookieValueTypes;
  setUserEmail: (userEmail: string) => void;

  tempUser: { name: string };
  setTempUser: (name: string) => void;

  meetingToken: string;
  setMeetingToken: (token: string) => void;
}
