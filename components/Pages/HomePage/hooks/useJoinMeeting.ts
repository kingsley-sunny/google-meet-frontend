import { usePostRequest } from "@ventlio/tanstack-query";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { IMeeting } from "../../../../base/types/IResponseType";

export const useCreateMeeting = () => {
  const router = useRouter();
  const { post, error, data, isLoading } = usePostRequest<IMeeting>({
    path: "/meeting-requests",
  });

  const handleCreateMeeting = (onSuccess?: (data: any) => void) => {
    post(data, {
      onError(error) {
        toast.error(error.message);
      },
      onSuccess(data) {
        if (onSuccess) {
          onSuccess(data);
        }
      },
    });
  };

  return { handleCreateMeeting, error, data, isLoading };
};
