import { useQueryHeaders } from "@ventlio/tanstack-query";
import { ReactNode, useEffect } from "react";
import { useAuth } from "../../base/store/authStore/authStore";
import { cn } from "../../lib/utils";
import Container from "../ui/Container";
import Logo from "../ui/Logo";
import { UserAvatar } from "../ui/UserAvatar";

const HomeLayout = ({ className, children }: { className?: string; children: ReactNode }) => {
  const { user, accessToken, setUser, setUserEmail, setTempUser } = useAuth();
  const { setQueryHeaders } = useQueryHeaders();

  useEffect(() => {
    console.log("🚀 ~~ useEffect ~~ accessToken:", accessToken);

    if (accessToken) {
      setQueryHeaders({ Authorization: `Bearer ${accessToken}` });
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

          <UserAvatar />
        </div>
      </Container>

      <div className=''>{children}</div>
    </div>
  );
};

export default HomeLayout;
