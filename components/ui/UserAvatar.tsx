import { useEffect, useState } from "react";
import { ICommonProps } from "../../base/interfaces/IProps";
import { useAuth } from "../../base/store/authStore/authStore";
import { cn } from "../../lib/utils";
import UserIcon from "../Icons/UserIcon";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export const UserAvatar = ({
  className,
  url,
  name,
}: ICommonProps & { url?: string; name?: string }) => {
  const [text, setText] = useState<string>();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setText(user?.name?.substring(0, 2));
    }
    if (name) {
      setText(name?.substring(0, 2));
    }
  }, [user, name]);

  return (
    <Avatar className={cn(className)}>
      <AvatarImage
        onLoadingStatusChange={status => {
          console.log("status", status);
        }}
        src={url || user?.pic_url}
      />
      <AvatarFallback className='text-xl'>
        {!text && <UserIcon className='w-4 h-4' />}
        {text && <span>{text}</span>}
      </AvatarFallback>
    </Avatar>
  );
};
