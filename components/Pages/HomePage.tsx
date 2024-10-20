import { KeyboardIcon } from "lucide-react";
import { useRouter } from "next/router";
import VideoIcon from "../Icons/VideoIcon";
import Container from "../ui/Container";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className='mt-32'>
      <Container>
        <div className='max-w-xl mx-auto text-center'>
          <h2 className='text-5xl leading-tight'>Premium video meetings. Now free for everyone.</h2>

          <p className='mt-3 text-muted-foreground text-xl'>
            We re-engineered the service we built for secure business meetings, Google Meet, to make
            it free and available for all.
          </p>
        </div>

        {/* the form */}
        <div className='max-w-[600px] mx-auto mt-10 space-x-8 flex items-stretch'>
          <Button className='flex space-x-3 text-base font-semibold'>
            <VideoIcon className='w-5 h-5' />
            <span>New Meeting</span>
          </Button>

          <form className='flex w-full items-stretch space-x-2'>
            <div className='border flex items-center w-full px-4 border-black rounded-none py-1'>
              <KeyboardIcon />
              <Input type='text' className='border-none' placeholder='Enter code or link' />
            </div>

            <Button
              type='button'
              className='text-xl hover:bg-primary/10 bg-transparent text-primary'
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
