import { usePostRequest } from "@ventlio/tanstack-query";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useAuth } from "../../../../base/store/authStore/authStore";
import { IUser } from "../../../../base/types/IResponseType";

export const useLogin = () => {
  const router = useRouter();
  const { post, error, data, isLoading } = usePostRequest<IUser>({
    path: "/auth/login",
  });
  const { setAuthToken, setUser } = useAuth();

  const handleLogin = (data: any) => {
    post(data, {
      onError(error) {
        toast.error(error.message);
      },
      onSuccess(data) {
        toast.success("Login Successful");
        setAuthToken(data.data.accessToken);
        setUser(data.data);
        router.push("/");
      },
    });
  };

  return { handleLogin, error, data, isLoading };
};
