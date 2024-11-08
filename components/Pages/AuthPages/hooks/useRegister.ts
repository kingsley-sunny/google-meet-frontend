import { usePostRequest } from "@ventlio/tanstack-query";
import { useRouter } from "next/router";
import { toast } from "sonner";

import { useAuth } from "../../../../base/store/authStore/authStore";
import { IUser } from "../../../../base/types/IResponseType";

export const useRegister = () => {
  const router = useRouter();
  const { post, error, data, isLoading } = usePostRequest<IUser>({
    path: "/auth/signup",
  });
  const { setAuthToken, setUser } = useAuth();

  const handleRegister = (data: any) => {
    post(data, {
      onError(error) {
        toast.error(error.message);
      },
      onSuccess(data) {
        toast.success("Registration Successful");
        setAuthToken(data.data.accessToken);
        setUser(data.data);
        router.push("/");
      },
    });
  };

  return { handleRegister, error, data, isLoading };
};
