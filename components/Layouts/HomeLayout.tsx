import { ReactNode } from "react";
import { cn } from "../../lib/utils";
import UserIcon from "../Icons/UserIcon";
import Container from "../ui/Container";
import Logo from "../ui/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const HomeLayout = ({ className, children }: { className?: string; children: ReactNode }) => {
  return (
    <div className={cn("px-4", className)}>
      <Container className='py-4 !max-w-none flex justify-between items-center'>
        {/* the nav bar */}
        <Logo />

        {/* the signIn button */}
        <div className='flex justify-center items-center space-x-6'>
          <p className='text-muted-foreground text-xl'>
            <span className=''>{new Date().toDateString()}</span>
          </p>

          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>
              <UserIcon className='w-4 h-4' />
            </AvatarFallback>
          </Avatar>
        </div>
      </Container>

      <div className=''>{children}</div>
    </div>
  );
};

export default HomeLayout;
