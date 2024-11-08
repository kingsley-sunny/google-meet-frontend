import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { create } from "zustand";
import { IAuth } from "./auth.interface";

export const useAuth = create<IAuth>(set => ({
  get accessToken() {
    const token = getCookie("accessToken") as string;

    return token;
  },

  setAuthToken: (token: IAuth["accessToken"]) => {
    const date = getExpirationTime();

    setCookie("accessToken", token, {
      expires: date,
    });

    return set(() => ({ accessToken: token }));
  },

  get user() {
    const cookieUser = getCookie("user") as string;

    const user = cookieUser ? JSON.parse(cookieUser) : undefined;

    return user;
  },
  setUser: (user: IAuth["user"]) => {
    const date = getExpirationTime();

    const cookieUser = JSON.stringify(user);
    setCookie("user", cookieUser, { expires: date });
    return set(() => ({ user }));
  },

  logOut: () => {
    deleteCookie("user");
    deleteCookie("accessToken");
    return set(() => ({ accessToken: undefined, user: undefined }));
  },

  get userEmail() {
    const email = getCookie("user_email");
    return email;
  },
  //
  setUserEmail(userEmail) {
    setCookie("user_email", userEmail);

    return set(() => ({ userEmail }));
  },

  get tempUser() {
    const tempUser = getCookie("tempUser");
    return tempUser as any;
  },

  setTempUser(id, name) {
    const tempUser = JSON.stringify({ id, name });
    setCookie("tempUser", tempUser);
  },

  setMeetingToken: (token: string) => {
    const date = getExpirationTime();

    setCookie("meeting_token", token);
  },

  get meetingToken() {
    const token = getCookie("meeting_token") as string;

    return token;
  },
}));

function getExpirationTime() {
  const ONE_DAY_IN_MILLISECONDS = 86400000 * 7;

  const date = new Date();
  date.setMilliseconds(ONE_DAY_IN_MILLISECONDS);
  return date;
}
