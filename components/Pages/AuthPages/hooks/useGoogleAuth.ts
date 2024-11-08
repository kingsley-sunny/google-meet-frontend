import { usePostRequest } from "@ventlio/tanstack-query";
import { getAuth, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { app, googleProvider } from "../../../../base/configs/firebaseConfig";
import { useAuth } from "../../../../base/store/authStore/authStore";
import { IUser } from "../../../../base/types/IResponseType";

export const useGoogleAuth = (type: "login" | "register") => {
  const { post } = usePostRequest<IUser>({ path: "/auth/signup" });
  const { post: login } = usePostRequest<IUser>({ path: "/auth/login" });
  const router = useRouter();
  const { setUser, setAuthToken } = useAuth();

  const signInWithGoogle = async () => {
    try {
      const auth = getAuth(app);
      const userCredentials = await signInWithPopup(auth, googleProvider);

      if (type === "login") {
        login(
          {
            email: userCredentials.user.email,
            password: "google",
          },
          {
            onError(error) {
              toast.error(error.message);
            },
            onSuccess(data) {
              toast.success("Google Sign successful");
              router.push("/");
              setAuthToken(data.data.accessToken);
              setUser(data.data);
            },
          }
        );

        return;
      }

      post(
        {
          name: userCredentials.user.displayName,
          email: userCredentials.user.email,
          registration_provider: "google",
          pic_url: userCredentials.user.photoURL,
        },
        {
          onError(error) {
            toast.error(error.message);
          },
          onSuccess(data) {
            toast.success("Google Sign successful");
            router.push("/");
            setAuthToken(data.data.accessToken);
            setUser(data.data);
          },
        }
      );
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return { signInWithGoogle };
};
