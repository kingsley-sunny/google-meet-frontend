import { KeyboardIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/router";
import { CgAttachment } from "react-icons/cg";
import VideoIcon from "../Icons/VideoIcon";
import Container from "../ui/Container";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className='mt-32'>
      <Container>
        <div className='max-w-xl mx-auto text-center'>
          <h2 className='text-3xl xl:text-5xl leading-tight'>
            Premium video meetings. Now free for everyone.
          </h2>

          <p className='mt-3 text-muted-foreground text-lg xl:text-xl xl:leading-8'>
            We re-engineered the service we built for secure business meetings, Google Meet, to make
            it free and available for all.
          </p>
        </div>

        {/* the form */}
        <div className='grid gap-3 max-w-[600px] mx-auto mt-10 lg:space-x-6 lg:flex items-stretch'>
          <Popover>
            <PopoverTrigger asChild className=''>
              <Button className='flex w-full space-x-3 py-3 text-base px-8 font-semibold'>
                <VideoIcon className='w-5 h-5' />
                <span>New Meeting</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='shadow-xl border-[0.1px] border-border/20 py-3'>
              <button className='flex py-3 cursor-pointer w-full items-center space-x-4'>
                <PlusIcon className='w-6 h-6' />
                <p className=''>Create a instant meeting</p>
              </button>

              <button className='flex py-3 cursor-pointer w-full items-center space-x-4'>
                <CgAttachment className='w-6 h-6' />
                <p className=''>Create a meeting for Later</p>
              </button>
            </PopoverContent>
          </Popover>

          <form className='flex w-full items-stretch space-x-2'>
            <div className='border flex items-center w-full px-4 border-border rounded py-1'>
              <KeyboardIcon />
              <Input
                type='text'
                className='border-none placeholder-border'
                placeholder='Enter code or link'
              />
            </div>

            <Button
              type='button'
              className='text-lg font-medium lg:text-xl hover:bg-primary/10 bg-primary/10 lg:bg-transparent text-primary'
              onClick={() => router.push("/meeting-page")}
            >
              Join
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
