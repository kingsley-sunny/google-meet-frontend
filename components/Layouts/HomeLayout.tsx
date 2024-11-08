import { useQueryHeaders } from "@ventlio/tanstack-query";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../../base/store/authStore/authStore";
import { cn } from "../../lib/utils";
import UserIcon from "../Icons/UserIcon";
import Container from "../ui/Container";
import Logo from "../ui/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const HomeLayout = ({ className, children }: { className?: string; children: ReactNode }) => {
  const { user, accessToken, setUser, setUserEmail, setTempUser } = useAuth();
  const { setQueryHeaders } = useQueryHeaders();
  const [text, setText] = useState<string>();

  useEffect(() => {
    console.log("🚀 ~~ useEffect ~~ accessToken:", accessToken);

    if (accessToken) {
      setQueryHeaders({ Authorization: `Bearer ${accessToken}` });
    }

    if (user) {
      setText(user?.name?.substring(0, 2));
    }
  }, []);

  return (
    <div className={cn("px-4", className)}>
      <Container className='py-4 !max-w-none flex justify-between items-center'>
        {/* the nav bar */}
        <Logo />

        <div className='flex justify-center items-center space-x-6'>
          <p className='text-muted-foreground text-xl hidden lg:block'>
            <span className=''>{new Date().toDateString()}</span>
          </p>

          <Avatar>
            <AvatarImage
              onLoadingStatusChange={status => {
                console.log("status", status);
              }}
              src={user?.pic_url}
            />
            <AvatarFallback className='text-xl'>
              {!text && <UserIcon className='w-4 h-4' />}
              {text && <span>{text}</span>}
            </AvatarFallback>
          </Avatar>
        </div>
      </Container>

      <div className=''>{children}</div>
    </div>
  );
};

export default HomeLayout;
